import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const cvaListItem = cva(
  [
    "flex",
    "justify-between",
    "items-center",
    "gap-2",
    "w-full",
    "min-w-max",
    "min-h-12",
    "py-3",
    "pl-4",
    "pr-3",

    "link-disabled:text-daikinNeutral-200",

    "link-enabled:hover:bg-daikinNeutral-100",
    "link-enabled:active:bg-daikinNeutral-200",

    "focus-visible:outline",
    "focus-visible:outline-1",
    "focus-visible:-outline-offset-1",
    "focus-visible:outline-daikinBlue-700",
  ],
  {
    variants: {
      leftIcon: {
        false: ["pl-4"],
        true: ["pl-3"],
      },
      rightIcon: {
        false: ["pr-4"],
        true: ["pr-3"],
      },
    },
  }
);

/**
 * The list item component functions as a child element of the list component, and is used to actually list items.
 *
 * You can choose between the `button` type, which uses the HTML button tag, and the `link` type, which uses the a tag, and use them according to your needs.
 *
 * Hierarchy:
 * - `daikin-list` > `daikin-list-item`
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event). Suppressed if `disabled` is true.
 *
 * @slot - A slot for the list item label content.
 * @slot action - An optional element that is displayed on the right of a list item. e.g. `daikin-checkbox`, `daikin-toggle`
 *
 * @example
 *
 * ```html
 * <daikin-list-item>List item label</daikin-list-item>
 * ```
 */
@customElement("daikin-list-item")
export class DaikinListItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}
  `;

  /**
   * Type of the list item.
   * If `"link"` is specified, the list item will be rendered as an `<a>` element or `<span>` element (if `disabled` is `true`).
   */
  @property({ type: String, reflect: true })
  type: "button" | "link" = "button";

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * An icon displayed at the left of the label.
   */
  @property({ type: String, reflect: true, attribute: "left-icon" })
  leftIcon: IconType | null = null;

  /**
   * Whether the right arrow icon is visible.
   * If there is content in the slot, it will always be false.
   */
  @property({ type: Boolean, reflect: true })
  chevron: boolean = false;

  /**
   * Whether the list item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @query("a,button")
  private _focusableElement!: HTMLAnchorElement | HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    const listCN = cvaListItem({
      leftIcon: !!this.leftIcon,
      rightIcon: this.chevron,
    });

    const leftContent = html`<span class="flex items-center flex-none gap-2">
      ${this.leftIcon
        ? html`<daikin-icon
            icon=${this.leftIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : nothing}
      <slot></slot>
    </span>`;

    const rightContent = html`<slot name="action">
      ${this.chevron
        ? html`<span class="flex-none size-6 i-daikin-chevron-right"></span>`
        : nothing}
    </slot>`;

    const wrapperType =
      this.type === "link"
        ? this.disabled
          ? "linkDisabled"
          : "link"
        : "button";

    const list = {
      button: () =>
        html`<button type="button" class=${listCN} ?disabled=${this.disabled}>
          ${leftContent}${rightContent}
        </button>`,
      link: () =>
        html`<a href=${ifDefined(this.href ?? undefined)} class=${listCN}>
          ${leftContent}${rightContent}
        </a>`,
      linkDisabled: () =>
        html`<span class=${listCN}>${leftContent}${rightContent}</span>`,
    }[wrapperType]();

    return html`<div role="listitem">${list}</div>`;
  }

  /**
   * Focuses on the inner button or link.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._focusableElement?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-list-item": DaikinListItem;
  }
}

export default DaikinListItem;
