import ctl from "@netlify/classnames-template-literals";
import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css";
import { on } from "../../utils/decoratorListener";
import { mixinLifecycle } from "../../utils/mixinLifecycle";

const STYLE_COMMON = ctl(`
  flex
  w-full
  h-full
  items-center
  justify-center
  text-center
  relative
  font-daikinSerif
  text-base
  tracking-wide
  whitespace-nowrap
  contain-paint
  disabled:cursor-default
  after:content-['']
  after:z-1
  after:absolute
  after:bottom-0
  after:left-0
  after:right-0
  after:w-full

  text-daikinBlue-500
  hover:text-daikinBlue-400
  active:text-daikinBlue-600
  focus-visible:text-daikinBlue-700
  disabled:text-daikinNeutral-300
  aria-selected:after:h-1
  aria-selected:after:bg-daikinBlue-500
  hover:aria-selected:after:bg-daikinBlue-400
  active:aria-selected:after:bg-daikinBlue-600
  focus-visible:aria-selected:after:bg-daikinBlue-700
  disabled:after:bg-daikinNeutral-300
`);

const STYLE_MAP_SIZES = {
  default: ctl(`
    px-4
  `),
  condensed: ctl(`
    px-[10px]
  `),
};

@customElement("daikin-tab")
export class DaikinTab extends mixinLifecycle(LitElement) {
  static readonly styles = css`
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
   * Must be unique within the tab group.
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
   * Whether to show the disabled state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether to show the active state \
   * ignored if `disabled` is `true`
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  @on("click", { capture: true })
  protected _handleClick(event: PointerEvent) {
    if (this.disabled) {
      event.stopImmediatePropagation();
    }
  }

  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }

  render() {
    const cn = [
      STYLE_COMMON,
      STYLE_MAP_SIZES[this.size ?? "default"] ?? STYLE_MAP_SIZES.default,
    ].join(" ");

    return html`
      <button
        class="${cn}"
        ?disabled="${this.disabled}"
        role="tab"
        aria-selected="${!this.disabled && this.active}"
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
