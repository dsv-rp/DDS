import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * The tab panels component is a child element within the `daikin-tabs` that controls the display of the content panels associated with each tab.
 * When a user selects a tab, the tab panels component ensures the corresponding content panel is shown while hiding the others.
 *
 * Hierarchy:
 * - `daikin-tabs` > `daikin-tab-panels` ("panels" slot)
 *
 * @slot panel:\<name\> - A slot for each panel content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tab-panels/index.js";
 * ```
 *
 * ```html
 * <!-- Note that `panels` must be set via property. -->
 * <daikin-tab-panels
 *   class="block w-full h-full"
 *   panel-role="tabpanel"
 *   value="foo"
 *   .panels="${['foo', 'bar', 'baz']}"
 * >
 *   <div slot="panel:foo">Foo Panel (visible)</div>
 *   <div slot="panel:bar">Bar Panel (hidden)</div>
 *   <div slot="panel:baz">Baz Panel (hidden)</div>
 * </daikin-tab-panels>
 * ```
 */
@customElement("daikin-tab-panels")
export class DaikinTabPanels extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}
  `;

  /**
   * The panel to be displayed.
   * Set automatically by `daikin-tabs` if used within it.
   */
  @property({ type: String, reflect: true })
  value: string = "";

  /**
   * A list of panel names.
   * This is used as the slot name for panels (`panel:<name>`).
   * Set automatically by `daikin-tabs` if used within it.
   */
  @property({
    type: Array,
    hasChanged: (newValue, oldValue) =>
      JSON.stringify(newValue) !== JSON.stringify(oldValue),
  })
  panels: string[] = [];

  /**
   * `role` attribute of the container.
   * Set to "tablist" automatically by `daikin-tabs` if used within it.
   */
  @property({ type: String, reflect: true, attribute: "panel-role" })
  panelRole: ARIARole | null = null;

  override render() {
    if (import.meta.env.DEV) {
      if (!this.panels.includes(this.value)) {
        console.warn(
          `[daikin-tab-panels] No panel slot named "panel:${this.value}". Nothing will be rendered.`
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
    "daikin-tab-panels": DaikinTabPanels;
  }
}
