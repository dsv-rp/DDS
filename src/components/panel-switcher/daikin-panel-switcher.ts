import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * Panel Switcher
 *
 * A completely unstyled panel switcher.
 *
 * @example
 *
 * ```html
 * <daikin-panel-switcher
 *   class="block w-full h-full"
 *   panels='["foo", "bar", "baz"]'
 *   value="foo"
 *   panelRole="tabpanel"
 * >
 *   <div slot="panel:foo">Foo Panel (visible)</div>
 *   <div slot="panel:bar">Bar Panel (hidden)</div>
 *   <div slot="panel:baz">Baz Panel (hidden)</div>
 * </daikin-panel-switcher>
 * ```
 */
@customElement("daikin-panel-switcher")
export class DaikinPanelSwitcher extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}
  `;

  /**
   * `value` of the currently selected tab.
   * see {@link DaikinTab.value}
   */
  @property({ type: String, reflect: true })
  value: string = "";

  @property({
    type: Array,
    hasChanged: (newValue, oldValue) =>
      JSON.stringify(newValue) !== JSON.stringify(oldValue),
  })
  panels: string[] = [];

  @property({ type: String, reflect: true, attribute: "panel-role" })
  panelRole: ARIARole | null = null;

  override render() {
    return repeat(
      this.panels,
      (value) =>
        html`<div
          class=${this.value === value ? "contents" : "hidden"}
          role=${ifDefined(this.panelRole ?? undefined)}
          ?hidden=${this.value !== value}
        >
          <slot name=${`panel:${value}`}></slot>
        </div>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-panel-switcher": DaikinPanelSwitcher;
  }
}
