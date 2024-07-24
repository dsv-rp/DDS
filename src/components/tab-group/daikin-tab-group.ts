import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinPanelSwitcher } from "../panel-switcher/daikin-panel-switcher";
import type { DaikinTab } from "../tab/daikin-tab";
import { scrollIntoViewOnlyParent } from "./scroller";

/**
 * The tab group component manages a group of tabs and switches the content displayed using the panel switcher component.
 *
 * Tab groups do not provide styles; users must apply styles to the wrapper of the tabs and the panel switcher(s).
 *
 * > [!WARNING]
 * > At least one tab must be available (that means, the tab must be present and enabled).
 * > Otherwise, unexpected behavior may be encountered.
 *
 * @fires beforechange - _Cancellable._ Emits when the current tab is about to be changed by user interaction.
 * @fires change - Emits when the current tab is changed.
 *
 * @slot - Tab list slot. Place `daikin-tab` elements here.
 * @slot panels - Tab panel slot. Place `daikin-panel-switcher` element(s) here.
 *
 * @csspart tablist
 *
 * @example
 *
 * ```html
 * <!-- See storybook for styling tab group. You'll need `::part(tablist)` to style the tab container. -->
 * <daikin-tab-group value="foo">
 *   <daikin-tab value="foo">Foo tab</daikin-tab>
 *   <daikin-tab value="bar">Bar tab</daikin-tab>
 *   <!-- At least one "daikin-panel-switcher" is needed to switch the content. -->
 *   <daikin-panel-switcher slot="panels">
 *     <!-- Mind the "panel:" prefix. -->
 *     <p slot="panel:foo">Foo tab content.</p>
 *     <p slot="panel:bar">Bar tab content.</p>
 *   </daikin-panel-switcher>
 * </daikin-tab-group>
 * ```
 */
@customElement("daikin-tab-group")
export class DaikinTabGroup extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}
  `;

  /**
   * `value` of the currently selected tab.
   * see {@link DaikinTab.value}
   */
  @property({ type: String, reflect: true })
  value: string = "";

  /**
   * Tab(s) in the default slot.
   */
  @queryAssignedElements({ selector: "daikin-tab" })
  private _tabs!: DaikinTab[];

  /**
   * Panel switcher(s) in the `panels` slot.
   */
  @queryAssignedElements({ slot: "panels", selector: "daikin-panel-switcher" })
  private _panelSwitchers!: DaikinPanelSwitcher[];

  /**
   * Emits `beforechange` event if necessary and returns whether we should proceed.
   *
   * 1. Check if `newValue` is different from `value`.
   * 2. Emit "beforechange" event.
   * 3. Check if the event is canceled.
   *
   * @param newValue The `value` of the newly active tab.
   * @returns `true` if we should proceed (event is emitted and not canceled). `false` otherwise.
   */
  private _emitBeforeChange(newValue: string): boolean {
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

  /**
   * Updates `this.value` and emit "change" event.
   *
   * @param newValue The `value` of the newly active tab.
   */
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

  /**
   * Updates `daikin-tab` component(s)' properties in the slot.
   *
   * Invoke when:
   * - `this.value` is changed.
   * - the default slot's content is changed.
   */
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

    if (!selectedTab) {
      // No tabs available!
      if (import.meta.env.DEV) {
        console.warn(
          `[daikin-tab-group] No tabs that can be activated! This may cause unexpected behavior.`
        );
      }
      return;
    }

    scrollIntoViewOnlyParent(selectedTab, "horizontal");
  }

  /**
   * Updates `daikin-panel-switcher` component(s)' properties in the slot.
   *
   * Invoke when:
   * - `this.value` is changed.
   * - the default slot's content is changed.
   * - the panel slot's content is changed.
   */
  private _updatePanelSwitcher(): void {
    const panelSwitchers = this._panelSwitchers;
    const tabs = this._tabs;

    const panels = Array.from(new Set(tabs.map((tab) => tab.value)));

    for (const panelSwitcher of panelSwitchers) {
      panelSwitcher.panelRole = "tabpanel";
      panelSwitcher.panels = panels;
      panelSwitcher.value = this.value;
    }
  }

  /**
   * Handles "click" event emitted by `daikin-tab` component.
   */
  private _handleTabClick(event: Event): void {
    const tabs = this._tabs;

    const tab = event.target as DaikinTab | null;
    if (!tab || !tabs.includes(tab)) {
      // Not from managed tabs.
      return;
    }

    event.stopImmediatePropagation();

    if (this.value === tab.value) {
      // Nothing changed.
      return;
    }

    if (!this._emitBeforeChange(tab.value)) {
      // Canceled.
      return;
    }

    for (const element of tabs) {
      element.active = element === tab;
    }
    this._updateValue(tab.value);
  }

  /**
   * Handles keyboard interactions in the tab list.
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset = {
      ArrowRight: 1,
      ArrowLeft: -1,
    }[event.key];
    if (!moveOffset) {
      return;
    }

    // Retrieve all tabs
    const tabs = this._tabs;

    // Check if there is at least one tab available
    if (!tabs.some((tab) => !tab.disabled)) {
      // No tabs available!
      if (import.meta.env.DEV) {
        console.warn(
          `[daikin-tab-group] No tabs that can be activated! This may cause unexpected behavior.`
        );
      }
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
      event.preventDefault();
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
      event.preventDefault();
      return;
    }
  }

  private _handleSlotChange(): void {
    this._updateTabs();
    this._updatePanelSwitcher();
  }

  private _handlePanelSwitcherSlotChange(): void {
    this._updatePanelSwitcher();
  }

  override render() {
    return html`
      <div
        part="tablist"
        role="tablist"
        @click=${this._handleTabClick}
        @keydown=${this._handleKeyDown}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      <slot
        name="panels"
        @slotchange=${this._handlePanelSwitcherSlotChange}
      ></slot>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._updateTabs();
    this._updatePanelSwitcher();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tab-group": DaikinTabGroup;
  }
}
