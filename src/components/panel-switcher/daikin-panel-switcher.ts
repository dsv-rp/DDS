import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * The panel switcher component is a child element within the `daikin-tab-group` that controls the display of the content panels associated with each tab.
 * When a user selects a tab, the panel switcher component ensures the corresponding content panel is shown while hiding the others.
 *
 * Hierarchy:
 * - `daikin-tab-group` > `daikin-panel-switcher` ("panels" slot)
 *
 * @slot panel:\<name\> - A slot for each panel content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/panel-switcher/index.js";
 * ```
 *
 * ```html
 * <!-- Note that `panels` must be set via property. -->
 * <daikin-panel-switcher
 *   class="block w-full h-full"
 *   .panels="${['foo', 'bar', 'baz']}"
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
   * The panel to be displayed.
   * Set automatically by `daikin-tab-group` if used within it.
   */
  @property({ type: String, reflect: true })
  value: string = "";

  /**
   * Set automatically by `daikin-tab-group` if used within it.
   */
  @property({
    type: Array,
    hasChanged: (newValue, oldValue) =>
      JSON.stringify(newValue) !== JSON.stringify(oldValue),
  })
  panels: string[] = [];

  /**
   * `role` attribute of the container.
   * Set to "tablist" automatically by `daikin-tab-group` if used within it.
   */
  @property({ type: String, reflect: true, attribute: "panel-role" })
  panelRole: ARIARole | null = null;

  override render() {
    if (import.meta.env.DEV) {
      if (!this.panels.includes(this.value)) {
        console.warn(
          `[daikin-panel-switcher] No panel slot named "panel:${this.value}". Nothing will be rendered.`
        );
      }
    }

    return repeat(
      this.panels,
      (value) =>
        html`<div
          class=${this.value === value ? "contents" : "hidden"}
          role=${
            // HACK: Workaround lit-analyzer not recognizing `nothing` (runem/lit-analyzer#207).
            (this.panelRole ?? nothing) as ARIARole
          }
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
