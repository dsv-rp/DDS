import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css";
import type { DaikinTab } from "../tab/daikin-tab";

/**
 * Tab Group that automatically manages child tabs.
 *
 * NOTE: If there is no tab available in the child elements, i.e., zero tabs, or if all tabs are disabled, it is ILLEGAL.
 */
@customElement("daikin-tab-group")
export class DaikinTabGroup extends LitElement {
  static readonly styles = css`
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

  private _managingTabs: [DaikinTab, () => void][] = [];

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
        composed: false,
        cancelable: false,
      })
    );

    this.value = newValue;
  }

  private _handleClick(tab: DaikinTab): void {
    if (this.value === tab.value) {
      return;
    }

    if (!this._handleBeforeChange(tab.value)) {
      return;
    }

    if (this._managingTabs.every(([element]) => element !== tab)) {
      return;
    }

    for (const [element] of this._managingTabs) {
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

    if (!this._managingTabs.some(([tab]) => !tab.disabled)) {
      return;
    }

    const activeTab = this._managingTabs.find(
      ([element]) => !element.disabled && element.active
    )?.[0];

    const activeElement = document.activeElement;
    const focusedTabIndex = activeElement
      ? this._managingTabs.findIndex(([element]) =>
          element.contains(activeElement)
        )
      : -1;

    if (focusedTabIndex < 0) {
      activeTab?.focus();
      return;
    }

    for (let i = 1; i <= this._managingTabs.length; i++) {
      const index =
        (focusedTabIndex + moveOffset * i + this._managingTabs.length * i) %
        this._managingTabs.length;
      const candidate = this._managingTabs[index][0];
      if (candidate.disabled) {
        continue;
      }

      candidate.focus();
      return;
    }
  }

  private _handleSlotChange(): void {
    const newTabs = Array.from(this.getElementsByTagName("daikin-tab"));

    // Cleanup disappeared tabs
    for (const [tab, cleanup] of this._managingTabs) {
      if (newTabs.includes(tab)) {
        continue;
      }

      // Disappeared tab
      cleanup();
    }

    const newManagingTabs: typeof this._managingTabs = [];
    let selectedTab;
    for (const tab of newTabs) {
      let item = this._managingTabs.find(([item]) => item === tab);
      if (!item) {
        // Newly appeared tab
        const onClickHandler = (): void => {
          this._handleClick(tab);
        };
        tab.addEventListener("click", onClickHandler);
        item = [
          tab,
          (): void => {
            tab.removeEventListener("click", onClickHandler);
          },
        ];
      }

      const isActive =
        !selectedTab && !tab.disabled && tab.value === this.value;
      tab.active = isActive;
      if (isActive) {
        selectedTab = tab;
      }

      newManagingTabs.push(item);
    }

    if (!selectedTab) {
      const fallbackTab = newTabs.find((tab) => !tab.disabled);
      if (fallbackTab) {
        fallbackTab.active = true;
        this._updateValue(fallbackTab.value);
      }
    }

    this._managingTabs = newManagingTabs;
  }

  render() {
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

  updated(changedProperties: Map<string, any>) {
    if (!changedProperties.has("value")) {
      return;
    }

    let selectedTab;
    for (const [tab] of this._managingTabs) {
      const isActive =
        !selectedTab && !tab.disabled && tab.value === this.value;
      tab.active = isActive;
      if (isActive) {
        selectedTab = tab;
      }
    }

    if (!selectedTab) {
      selectedTab = this._managingTabs.find(([tab]) => !tab.disabled)?.[0];
      if (selectedTab) {
        selectedTab.active = true;
        this._updateValue(selectedTab.value);
      }
    }

    selectedTab?.scrollIntoView();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tab-group": DaikinTabGroup;
  }
}
