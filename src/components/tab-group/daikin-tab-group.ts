import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTab } from "../tab/daikin-tab";

/**
 * Tab Group that automatically manages child tabs.
 *
 * NOTE: If there is no tab available in the child elements, i.e., zero tabs, or if all tabs are disabled, it is ILLEGAL.
 */
@customElement("daikin-tab-group")
export class DaikinTabGroup extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
      width: fit-content;
    }
  `;

  /**
   * `value` of the currently selected tab.
   * see {@link DaikinTab.value}
   */
  @property({ type: String, reflect: true })
  value: string = "";

  @queryAssignedElements({ selector: "daikin-tab" })
  private _tabs!: DaikinTab[];

  private _handleBeforeChange(newValue: string): boolean {
    if (this.value === newValue) {
      return false;
    }

    if (
      !this.dispatchEvent(
        new CustomEvent("beforechange", {
          detail: { oldValue: this.value, newValue },
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      )
    ) {
      return false;
    }

    return true;
  }

  private _updateValue(newValue: string): void {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { oldValue: this.value, newValue },
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );

    this.value = newValue;
  }

  private _updateTabs(): void {
    const tabs = this._tabs;

    // Activate the tab which has current `value`s
    let selectedTab;
    for (const tab of tabs) {
      const isActive =
        !selectedTab && !tab.disabled && tab.value === this.value;
      tab.active = isActive;
      if (isActive) {
        selectedTab = tab;
      }
    }

    // If there is no tab with current `value`, activate the first tab
    if (!selectedTab) {
      selectedTab = tabs.find((tab) => !tab.disabled);
      if (selectedTab) {
        selectedTab.active = true;
        this._updateValue(selectedTab.value);
      }
    }

    selectedTab?.scrollIntoView();
  }

  private _handleTabSelect(event: Event): void {
    const tab = event.target as DaikinTab | null;
    if (tab?.tagName !== "DAIKIN-TAB") {
      return;
    }

    event.stopImmediatePropagation();

    if (this.value === tab.value) {
      return;
    }

    if (!this._handleBeforeChange(tab.value)) {
      return;
    }

    for (const element of this._tabs) {
      element.active = element === tab;
    }
    this._updateValue(tab.value);
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!moveOffset) {
      return;
    }

    // Retrieve all tabs
    const tabs = this._tabs;

    // Check if there is at least one tab available
    if (!tabs.some((tab) => !tab.disabled)) {
      // No tabs available!
      return;
    }

    // Get focused tab if any
    const activeElement = document.activeElement;
    const focusedTabIndex = activeElement
      ? tabs.findIndex((tab) => tab.contains(activeElement))
      : -1;

    // If there is no tab focused, focus on the active (current) tab
    if (focusedTabIndex < 0) {
      const activeTab = tabs.find((tab) => !tab.disabled && tab.active);
      activeTab?.focus();
      return;
    }

    // If there is a tab focused, move focus forward or backward
    for (let i = 1; i <= tabs.length; i++) {
      const index =
        (focusedTabIndex + moveOffset * i + tabs.length * i) % tabs.length;
      const candidate = tabs[index];
      if (candidate.disabled) {
        continue;
      }

      candidate.focus();
      return;
    }
  }

  constructor() {
    super();

    // Bubbled from children tabs
    this.addEventListener("select", this._handleTabSelect);
  }

  private _handleSlotChange(): void {
    this._updateTabs();
  }

  override render() {
    return html`
      <div
        class="inline-block w-full h-full"
        role="tablist"
        @keydown=${this._handleKeyDown}
      >
        <slot class="inline-flex" @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._updateTabs();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tab-group": DaikinTabGroup;
  }
}
