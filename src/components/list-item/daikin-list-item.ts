import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";

const INNER_CN = cva([
  "text-left",

  "before:absolute",
  "before:inset-0",
  "before:w-full",
  "before:h-full",

  "focus-visible:outline-none",
  "focus-visible:before:outline",
  "focus-visible:before:outline-1",
  "focus-visible:before:-outline-offset-1",
  "focus-visible:before:outline-daikinBlue-700",

  // For buttons and links
  "link-enabled:before:hover:bg-daikinNeutral-100",
  "link-enabled:before:active:bg-daikinNeutral-200",

  // For text
  "[&:not(a,button)]:before:hover:bg-daikinNeutral-100",
])();

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
 * @slot action - An optional slot for an interaction item to be placed to the right of the text. Place `daikin-checkbox`, `daikin-toggle`, or something similar.
 * @slot left-icon - An optional slot for an icon to be placed to the left of the text. Place `daikin-icon` or something similar.
 * @slot right-icon - An optional slot for an icon to be placed to the left of the text. Ignored if `action` slot is used. Place `daikin-icon` or something similar.
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

  private get _disabled(): boolean {
    return (
      // False if `type` is "text".
      this.type !== "text" &&
      // True if `this.disabled`, or if `type` is "link" and `href` is missing.
      (this.disabled || (this.type === "link" && this.href == null))
    );
  }

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this._disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    const disabled = this._disabled;

    const content = html`<span class="flex items-center w-full  relative z-0">
      <slot name="left-icon">
        <span class="block -ml-1"></span>
      </slot>
      <slot class="block px-2"></slot>
    </span>`;

    const list = {
      button: () =>
        html`<button type="button" class=${INNER_CN} ?disabled=${disabled}>
          ${content}
        </button>`,
      link: () =>
        html`<a
          class=${INNER_CN}
          href=${ifDefined(!disabled ? (this.href ?? undefined) : undefined)}
          role=${ifDefined(disabled ? "link" : undefined)}
          aria-disabled=${ifDefined(disabled ? "true" : undefined)}
        >
          ${content}
        </a>`,
      text: () => html`<span class=${INNER_CN}>${content}</span>`,
    }[this.type]();

    return html`<div
      class=${
        // We cannot directly write classes like `class="..."` as they include '&', which must be escaped. It can't be escaped either because TailwindCSS can't process it.
        // Set the text color here to apply to the icons on both sides along with text.
        "flex justify-between items-center w-full min-h-12 p-3 text-left relative [&:has(a:not(:any-link),:disabled)]:text-daikinNeutral-200"
      }
      role="listitem"
    >
      ${list}
      <slot name="action" class="flex items-center gap-3">
        <slot name="right-icon" class="pointer-events-none">
          <span class="block -mr-1"></span>
        </slot>
      </slot>
    </div>`;
  }

  /**
   * Focuses on the inner button or link.
   * It will have no effect if the `type` is "text" or `disabled` is `true`.
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