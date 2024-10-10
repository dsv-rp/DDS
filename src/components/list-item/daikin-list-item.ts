import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import {
  customElement,
  property,
  query,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const ACTIONABLE_OVERLAY_CLASS_NAME = [
  "focus-visible:outline-none",

  "focus-visible:before:outline",
  "focus-visible:before:outline-1",
  "focus-visible:before:-outline-offset-1",
  "focus-visible:before:outline-daikinBlue-700",

  "link-enabled:before:absolute",
  "link-enabled:before:w-full",
  "link-enabled:before:h-full",
  "link-enabled:before:inset-0",
  "link-enabled:before:m-auto",
  "link-enabled:before:hover:bg-daikinNeutral-100",
  "link-enabled:before:active:bg-daikinNeutral-200",
];

const cvaListItemContainer = cva(
  [
    "flex",
    "justify-between",
    "items-center",
    "gap-2",
    "w-full",
    "min-h-12",
    "py-3",
    "text-left",
    "relative",
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

const cvaListItem = cva(["text-left"], {
  variants: {
    type: {
      button: ACTIONABLE_OVERLAY_CLASS_NAME,
      link: ACTIONABLE_OVERLAY_CLASS_NAME,
      text: ["before:hover:bg-daikinNeutral-100"],
    },
    disabled: {
      false: [],
      true: ["text-daikinNeutral-200"],
    },
  },
});

const cvaIcon = cva([], {
  variants: {
    disabled: {
      false: [],
      true: ["text-daikinNeutral-200"],
    },
  },
});

type ListItemVariantProps = MergeVariantProps<typeof cvaListItem>;

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
 * @slot action - An optional element that is displayed on the right of a list item (e.g. `daikin-checkbox`, `daikin-toggle`). Please handle items in this slot by the user when list item is disabled.
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
  type: ListItemVariantProps["type"] = "button";

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   * If omitted with `type="link"`, the link will be treated as [a placeholder link](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element:~:text=If%20the%20a%20element%20has%20no%20href%20attribute) and rendered as disabled state.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * An icon displayed at the left of the label.
   */
  @property({ type: String, reflect: true, attribute: "left-icon" })
  leftIcon: IconType | null = null;

  /**
   * An icon displayed at the right of the label.
   * Ignored if the `action` slot is used.
   */
  @property({ type: String, reflect: true, attribute: "right-icon" })
  rightIcon: IconType | null = null;

  /**
   * Whether the list item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @queryAssignedElements({ slot: "action" })
  private _actions!: HTMLElement[];

  @query("a,button")
  private _focusableElement!: HTMLAnchorElement | HTMLButtonElement | null;

  @state()
  private _hasActionSlot = false;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    const listCN = cvaListItem({ type: this.type, disabled: this.disabled });

    const createIcon = (icon: IconType | null) =>
      icon
        ? html`<span class=${cvaIcon({ disabled: this.disabled })}>
            <daikin-icon icon=${icon} size="xl" color="current"></daikin-icon>
          </span>`
        : nothing;

    const content = html`<span
      class="flex items-center w-full gap-2 relative z-0"
    >
      ${createIcon(this.leftIcon)}
      <slot></slot>
    </span>`;

    const linkDisabled = this.disabled || this.href == null;
    const list = {
      button: () =>
        html`<button type="button" class=${listCN} ?disabled=${this.disabled}>
          ${content}
        </button>`,
      link: () =>
        html`<a
          class=${listCN}
          href=${ifDefined(
            !linkDisabled ? (this.href ?? undefined) : undefined
          )}
          role=${ifDefined(linkDisabled ? "link" : undefined)}
          aria-disabled=${ifDefined(linkDisabled ? "true" : undefined)}
        >
          ${content}
        </a>`,
      text: () => html`<span class=${listCN}>${content}</span>`,
    }[this.type]();

    return html`<div
      class=${cvaListItemContainer({
        leftIcon: !!this.leftIcon,
        rightIcon: !!this.rightIcon || this._hasActionSlot,
      })}
      role="listitem"
    >
      ${list}
      <slot name="action" class="flex items-center gap-3">
        ${createIcon(this.rightIcon)}
      </slot>
    </div>`;
  }

  protected override firstUpdated(): void {
    this._hasActionSlot = !!this._actions.length;
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
