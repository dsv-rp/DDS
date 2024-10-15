import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaLinkSlot = cva(
  [
    "h-8",
    "font-normal",
    "not-italic",
    "leading-8",
    "text-sm",
    "text-daikinBlue-500",
    "outline-none",
    "font-daikinSerif",
  ],
  {
    variants: {
      variant: {
        normal: [
          "hover:text-daikinBlue-300",
          "active:text-daikinNeutral-800",
          "focus-visible:text-daikinBlue-700",
        ],
        ellipsis: ["hover:text-daikinBlue-300"],
      },
      disabled: {
        true: [
          "!text-daikinNeutral-800",
          "pointer-events-none",
          "cursor-default",
          "focus-visible:!text-daikinNeutral-800",
        ],
        false: [],
      },
    },
  }
);

type LinkVariantProps = MergeVariantProps<typeof cvaLinkSlot>;

/**
 * The `daikin-breadcrumb-item` is a component used to represent each item of the breadcrumb list, and is used as a child element of the `daikin-breadcrumb` component.
 *
 * Hierarchy:
 * - `daikin-breadcrumb` > `daikin-breadcrumb-item`
 *
 * @slot - A slot for the breadcrumb item content.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-breadcrumb` component for complete example. -->
 * <daikin-breadcrumb-item href="#">
 *   Breadcrumb Item 1
 * </daikin-breadcrumb-item>
 * ```
 */
@customElement("daikin-breadcrumb-item")
export class DaikinBreadcrumbItem extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    :host([hidden]) {
      display: none;
    }
  `;

  /**
   * Specify link href
   */
  @property({ type: String, reflect: true })
  href = "";

  /**
   * Specifies the display content.
   * If `ellipsis`, the "..." will be displayed instead of the link.
   * Set automatically by `daikin-breadcrumb`.
   */
  @property({ type: String, reflect: true })
  variant: LinkVariantProps["variant"] = "normal";

  /**
   * Specify whether the link should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the link target
   */
  @property({ type: String, reflect: true })
  target: string | null = null;

  /**
   * Whether the slash after the link should shown.
   * Set automatically by `daikin-breadcrumb`.
   */
  @property({ type: Boolean, reflect: true, attribute: "trailing-slash" })
  trailingSlash = false;

  /**
   * Whether the item is the last one.
   */
  @property({ type: Boolean, reflect: true })
  last = false;

  /**
   * Whether the link should be hidden when ellipsis mode.
   * Set automatically by `daikin-breadcrumb`.
   */
  @property({ type: Boolean, reflect: true })
  override hidden = false;

  @queryAssignedElements({ slot: "link" })
  private _links!: Array<HTMLElement>;

  override render() {
    const slash = this.trailingSlash
      ? html`<span
          class="text-daikinNeutral-800 font-daikinSerif"
          aria-hidden="true"
        >
          /
        </span>`
      : null;
    return html`
      ${this.variant === "normal"
        ? html`<a
            class=${cvaLinkSlot(this)}
            href=${ifDefined(this.href)}
            target=${
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
              ifDefined(this.target) as any
            }
            aria-current=${this.last}
            tabindex=${this.last ? "-1" : "0"}
          >
            <slot></slot>
          </a>`
        : // Though `cvaLinkSlot` is designed for slots, it contains "& > *" selector for fallback content so it can be used here.
          html`<span class=${cvaLinkSlot(this)} aria-label="…">
            <span>. . .</span>
          </span> `}
      ${slash}
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("last") && this._links.length > 0) {
      if (this.last) {
        this._links[0].setAttribute("aria-current", "true");
        this._links[0].setAttribute("tabindex", "-1");
      } else {
        this._links[0].setAttribute("tabindex", "0");
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
