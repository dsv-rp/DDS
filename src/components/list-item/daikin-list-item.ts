import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";

const LIST_CN = cva([
  "text-left",

  "before:absolute",
  "before:w-full",
  "before:h-full",
  "before:inset-0",

  // For buttons and links
  "focus-visible:outline-none",
  "focus-visible:before:outline",
  "focus-visible:before:outline-1",
  "focus-visible:before:-outline-offset-1",
  "focus-visible:before:outline-daikinBlue-700",

  "link-enabled:before:hover:bg-daikinNeutral-100",
  "link-enabled:before:active:bg-daikinNeutral-200",
  "[&:is(a,button)]:link-disabled:text-daikinNeutral-200",

  // For text
  "[&:not(a,button)]:before:hover:bg-daikinNeutral-100",
])();

const cvaIcon = cva([], {
  variants: {
    disabled: {
      false: [],
      true: ["text-daikinNeutral-200"],
    },
  },
});

/**
 * The list item component is used to represent a single item in a list. Please use it within the `daikin-list` component.
 *
 * The following types are available:
 *
 * - `button`: Uses `<button>` tag.
 * - `link`: Uses `<a>` tag.
 * - `text`: Uses `<span>` tag.
 *
 * Hierarchy:
 * - `daikin-list` > `daikin-list-item`
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event). Suppressed if `disabled` is true.
 *
 * @slot - A slot for the list item label content.
 * @slot action - An optional element that is displayed on the right of a list item (e.g. `daikin-checkbox`, `daikin-toggle`). Please handle items in this slot by the user when list item is disabled.
 * @slot left-icon - Specify the icon you want to use on the left. You can also use something other than `daikin-icon`.
 * @slot right-icon - Specify the icon you want to use on the right. You can also use something other than `daikin-icon`.
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
   * - `button` (default): The list item will be rendered as a `<button>` element.
   * - `link`: The list item will be rendered as an `<a>` element.
   * - `text`: The list item will be rendered as a `<span>` element. Use this if the list itself has no action.
   */
  @property({ type: String, reflect: true })
  type: "button" | "link" | "text" = "button";

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   * If omitted with `type="link"`, the link will be treated as [a placeholder link](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element:~:text=If%20the%20a%20element%20has%20no%20href%20attribute) and rendered as disabled state.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * Whether the list item is disabled.
   * Ignored if the `type` is `"text"`.
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
    const disabled =
      // False if `type` is "text".
      this.type !== "text" &&
      // True if `this.disabled`, or if `type` is "link" and `href` is missing.
      (this.disabled || (this.type === "link" && this.href == null));

    const content = html`<span class="flex items-center w-full  relative z-0">
      <slot name="left-icon" class=${cvaIcon({ disabled })}>
        <span class="block -ml-1"></span>
      </slot>
      <span class="px-2"><slot></slot></span>
    </span>`;

    const list = {
      button: () =>
        html`<button type="button" class=${LIST_CN} ?disabled=${disabled}>
          ${content}
        </button>`,
      link: () =>
        html`<a
          class=${LIST_CN}
          href=${ifDefined(!disabled ? (this.href ?? undefined) : undefined)}
          role=${ifDefined(disabled ? "link" : undefined)}
          aria-disabled=${ifDefined(disabled ? "true" : undefined)}
        >
          ${content}
        </a>`,
      text: () => html`<span class=${LIST_CN}>${content}</span>`,
    }[this.type]();

    return html`<div
      class="flex justify-between items-center w-full min-h-12 p-3 text-left relative"
      role="listitem"
    >
      ${list}
      <slot name="action" class="flex items-center gap-3">
        <slot name="right-icon" class=${cvaIcon({ disabled })}>
          <span class="block -mr-1"></span>
        </slot>
      </slot>
    </div>`;
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
