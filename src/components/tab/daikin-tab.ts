import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTab = cva(
  [
    "flex",
    "w-full",
    "h-full",
    "items-center",
    "justify-center",
    "text-center",
    "relative",
    "font-daikinSerif",
    "text-base",
    "tracking-wide",
    "whitespace-nowrap",
    "contain-paint",
    "disabled:cursor-default",
    "after:content-['']",
    "after:z-1",
    "after:absolute",
    "after:bottom-0",
    "after:left-0",
    "after:right-0",
    "after:w-full",

    "text-daikinBlue-500",
    "hover:text-daikinBlue-400",
    "active:text-daikinBlue-600",
    "focus-visible:text-daikinBlue-700",
    "disabled:text-daikinNeutral-300",
    "aria-selected:after:h-1",
    "aria-selected:after:bg-daikinBlue-500",
    "hover:aria-selected:after:bg-daikinBlue-400",
    "active:aria-selected:after:bg-daikinBlue-600",
    "focus-visible:aria-selected:after:bg-daikinBlue-700",
    "disabled:after:bg-daikinNeutral-300",
  ],
  {
    variants: {
      size: {
        default: ["px-4"],
        condensed: ["px-[10px]"],
      },
    },
  }
);

/**
 * The tab component that can be used within `daikin-tab-group` component.
 *
 * @fires click - Emits when the tab is clicked and not disabled.
 * @slot - Tab content slot.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-tab-group` component for complete example. -->
 * <daikin-tab value="foo">Foo tab</daikin-tab>
 * ```
 */
@customElement("daikin-tab")
export class DaikinTab extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
      width: fit-content;
      height: 48px;
    }

    :host([size="condensed"]) {
      height: 40px;
    }
  `;

  /**
   * A unique string that identifies a tab.
   * Must be unique within the `daikin-tab-group` component.
   */
  @property({ type: String, reflect: true })
  value: string = "";

  /**
   * Size of tab
   * @default "default"
   */
  @property({ type: String, reflect: true })
  size: "default" | "condensed" = "default";

  /**
   * Whether to show the disabled state.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether to show the active (selected) state.
   * Ignored if `disabled` is `true`.
   * Set automatically by `daikin-tab-group` component.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  private _handleClick(event: MouseEvent | PointerEvent) {
    if (this.disabled) {
      event.stopImmediatePropagation();
    }
  }

  constructor() {
    super();

    this.addEventListener("click", this._handleClick);
  }

  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }

  override render() {
    const cn = cvaTab({
      size: this.size,
    });

    return html`
      <button
        class=${cn}
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
