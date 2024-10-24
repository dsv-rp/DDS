import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTabPanels } from "../tab-panels/daikin-tab-panels";
import type { DaikinTab } from "../tab/daikin-tab";
import { scrollIntoViewOnlyParent } from "./scroller";

/**
 * The tab group component manages a group of tabs and switches the content displayed using the panel switcher component.
 * It allows users to navigate between different sections of content by clicking on individual tabs.
 * Tab groups do not provide styles; developers must apply styles to the wrapper of the tabs (`tablist` part) and to the panel switcher(s).
 *
 * > [!WARNING]
 * > At least one tab must be available (that means, the tab must be present and enabled).
 * > Otherwise, unexpected behavior may be encountered.
 *
 * Hierarchies:
 * - `daikin-tabs` > `daikin-tab`
 * - `daikin-tabs` > `daikin-tab-panels` ("panels" slot)
 *
 * @fires beforechange - _Cancellable._ A custom event emitted when the current tab is about to be changed by user interaction. The current value can be obtained with `event.target.value` and the new value with `event.detail.newTab.value`.
 * @fires change - A custom event emitted when the current tab is changed. The new value can be obtained with `event.target.value`.
 *
 * @slot - A slot for tab buttons. Place `daikin-tab` elements here.
 * @slot panels - A slot for tab panels component. Place a `daikin-tab-panels` element here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tab/index.js";
 * import "@daikin-oss/design-system-web-components/components/tab-group/index.js";
 * import "@daikin-oss/design-system-web-components/components/tab-panels/index.js";
 * ```
 *
 * ```html
 * <!-- See storybook for styling tab group. You'll need `::part(tablist)` to style the tab container. -->
 * <daikin-tabs value="foo">
 *   <daikin-tab value="foo">Foo tab</daikin-tab>
 *   <daikin-tab value="bar">Bar tab</daikin-tab>
 *   <!-- At least one "daikin-tab-panels" is needed to switch the content. -->
 *   <daikin-tab-panels slot="panels">
 *     <!-- Mind the "panel:" prefix. -->
 *     <p slot="panel:foo">Foo tab content.</p>
 *     <p slot="panel:bar">Bar tab content.</p>
 *   </daikin-tab-panels>
 * </daikin-tabs>
 * ```
 */
@customElement("daikin-tabs")
export class DaikinTabs extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * `value` of the currently selected tab (`daikin-tab`).
   */
  @property({ type: String, reflect: true })
  value: string = "";

  /**
   * Tab(s) in the default slot.
   */
  @queryAssignedElements({ selector: "daikin-tab" })
  private readonly _tabs!: readonly DaikinTab[];

  /**
   * Panel switcher(s) in the `panels` slot.
   */
  @queryAssignedElements({ slot: "panels", selector: "daikin-tab-panels" })
  private readonly _panelSwitchers!: readonly DaikinTabPanels[];

  /**
   * Emits `beforechange` event if necessary and returns whether we should proceed.
   *
   * 1. Check if `newTab.value` is different from `value`.
   * 2. Emit "beforechange" event.
   * 3. Check and return whether the event is canceled.
   *
   * @param newTab The newly active tab element.
   * @returns `true` if we should proceed (event is emitted and not canceled). `false` otherwise.
   */
  private _emitBeforeChange(newTab: DaikinTab): boolean {
    if (this.value === newTab.value) {
      return false;
    }

    if (
      !this.dispatchEvent(
        new CustomEvent("beforechange", {
          detail: { newTab },
          bubbles: true,
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
   * @param newTab The newly active tab element.
   */
  private _updateValue(newTab: DaikinTab): void {
    // DDS-1317 To ensure `event.target.value` has the correct value, we have to update `this.value` before emitting the "change" event.
    this.value = newTab.value;
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        cancelable: false,
      })
    );
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
        this._updateValue(selectedTab);
      }
    }

    if (!selectedTab) {
      // No tabs available!
      if (import.meta.env.DEV) {
        console.warn(
          `[daikin-tabs] No tabs that can be activated! This may cause unexpected behavior.`
        );
      }
      return;
    }

    scrollIntoViewOnlyParent(selectedTab, "horizontal");
  }

  /**
   * Updates `daikin-tab-panels` component(s)' properties in the slot.
   *
   * Invoke when:
   * - `this.value` is changed.
   * - the default slot's content is changed.
   * - the panel slot's content is changed.
   */
  private _updateTabPanels(): void {
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

    if (!this._emitBeforeChange(tab)) {
      // Canceled.
      return;
    }

    for (const element of tabs) {
      element.active = element === tab;
    }
    this._updateValue(tab);
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
          `[daikin-tabs] No tabs that can be activated! This may cause unexpected behavior.`
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
    this._updateTabPanels();
  }

  private _handleTabPanelsSlotChange(): void {
    this._updateTabPanels();
  }

  override render() {
    return html`
      <div
        class="flex flex-nowrap w-full p-[3px] overflow-auto relative before:absolute before:h-[1px] before:inset-[3px] before:top-auto before:bg-daikinNeutral-100"
        role="tablist"
        @click=${this._handleTabClick}
        @keydown=${this._handleKeyDown}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      <slot name="panels" @slotchange=${this._handleTabPanelsSlotChange}></slot>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._updateTabs();
    this._updateTabPanels();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tabs": DaikinTabs;
  }
}
