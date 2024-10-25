import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTab = cva(
  [
    "flex",
    "w-full",
    "min-w-14",
    "h-10",
    "items-center",
    "justify-center",
    "px-4",
    "pt-2",
    "pb-3",
    "text-center",
    "font-bold",
    "font-daikinSerif",
    "tracking-wide",
    "whitespace-nowrap",
    "relative",

    "focus-visible:outline-none",
    "focus-visible:before:absolute",
    "focus-visible:before:-inset-[3px]",
    "focus-visible:before:z-[1]",
    "focus-visible:before:border",
    "focus-visible:before:border-2",
    "focus-visible:before:border-[#0081C0]",

    "disabled:text-daikinNeutral-400",

    "after:absolute",
    "after:inset-0",
    "after:top-auto",
  ],
  {
    variants: {
      active: {
        false: [
          "enabled:text-daikinNeutral-700",
          "enabled:hover:text-[#414141]",
          "enabled:hover:bg-[#f2f2f2]",
          "enabled:active:text-daikinNeutral-800",
          "enabled:active:bg-daikinNeutral-100",

          "after:h-[1px]",
          "after:bg-[#cecece]",
        ],
        true: [
          "enabled:text-daikinBlue-500",
          "enabled:hover:bg-[#DDF3FC]",
          "enabled:active:bg-[#BBE7F9]",

          "after:h-1",

          "enabled:after:bg-daikinBlue-500",
          "disabled:after:bg-daikinNeutral-400",
        ],
      },
    },
  }
);

/**
 * The tab component is a child element within the `daikin-tabs` component, representing a clickable button or label that users interact with to switch between different panels of content.
 * Each tab corresponds to a specific panel and is typically labeled to indicate the content it reveals.
 *
 * Hierarchy:
 * - `daikin-tabs` > `daikin-tab`
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<button>` element. Suppressed if `disabled` is true,
 *
 * @slot - A slot for the tab button content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tab/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-tabs` component for complete example. -->
 * <daikin-tab value="foo">Foo tab</daikin-tab>
 * ```
 */
@customElement("daikin-tab")
export class DaikinTab extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * A unique string that identifies a tab.
   * Must be unique within the `daikin-tabs` component.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Whether the tab is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether to show the active (selected) state.
   * Ignored if `disabled` is `true`.
   * Set automatically by `daikin-tabs` component.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  @query("button")
  private _button!: HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }

  override render() {
    return html`
      <button
        class=${cvaTab({ active: this.active })}
        ?disabled=${this.disabled}
        role="tab"
        aria-selected=${!this.disabled && this.active}
        tabindex=${this.active ? 0 : -1}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tab": DaikinTab;
  }
}
