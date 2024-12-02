import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import tailwindStyles from "../../tailwind.css?inline";
import { calculatePagination } from "./pagination-utils";

const cvaPageButton = cva(
  [
    "border-0",
    "no-underline",
    "flex",
    "relative",
    "items-center",
    "justify-center",
    "min-w-12",
    "min-h-12",
    "font-daikinSerif",
    "text-base",
    "not-italic",
    "leading-6",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-1",
    "focus-visible:outline-ddt-border-focus",
  ],
  {
    variants: {
      active: {
        true: [
          "text-ddt-common-brand",
          "focus-visible:text-ddt-common-brand",
          "font-bold",
          "hover:text-ddt-border-focus",
          "hover:bg-ddt-surface-selected-default",
          "active:text-ddt-common-brand-primary-press",
          "active:bg-ddt-common-brand-secondary-press",
          "after:bg-ddt-common-brand",
          "after:content-['']",
          "after:h-1",
          "after:absolute",
          "after:inset-0",
          "after:top-auto",
        ],
        false: [
          "font-normal",
          "text-ddt-common-neutral-default",
          "active:bg-ddt-common-neutral-secondary-press",
          "active:text-ddt-text-primary",
          "hover:bg-ddt-common-neutral-secondary-hover",
          "hover:text-ddt-common-neutral-primary-hover",
        ],
      },
    },
  }
);

const cvaEllipsis = cva([
  "relative",
  "border-0",
  "no-underline",
  "flex",
  "items-center",
  "justify-center",
  "w-12",
  "h-12",
  "font-daikinSerif",
  "text-base",
  "not-italic",
  "font-normal",
  "leading-6",
  "text-ddt-common-neutral-default",
]);

const cvaChevronButton = cva([
  "border-0",
  "no-underline",
  "flex",
  "items-center",
  "justify-center",
  "w-12",
  "h-12",
  "text-ddt-common-neutral-primary-hover",
  "font-daikinSerif",
  "text-base",
  "not-italic",
  "font-normal",
  "leading-6",
  "enabled:hover:bg-ddt-common-neutral-secondary-hover",
  "enabled:hover:text-ddt-common-neutral-primary-press",
  "enabled:active:bg-ddt-common-neutral-secondary-press",
  "enabled:active:text-[#313131]",
  "disabled:!text-ddt-common-disabled",
  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-1",
  "focus-visible:outline-ddt-border-focus",
]);

/**
 * The pagination component is used to navigate through a list of items that are divided into multiple pages.
 *
 * @fires change - Emitted when the current page number is changed.
 *
 * @example
 *
 * ```html
 * <daikin-pagination window="5" total="20" current="3"></daikin-pagination>
 * ```
 */
@customElement("daikin-pagination")
export class DaikinPagination extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
    }
  `;

  /**
   * The current page number, starting at 1.
   * Must be greater than 0 and less than or equal to `this.total`.
   */
  @property({ type: Number, reflect: true })
  current = 1;

  /**
   * The number of pages.
   * Must be greater than 0.
   */
  @property({ type: Number, reflect: true })
  total = 1;

  /**
   * Number of elements to display in pagination, including ellipses.
   * Must be greater than or equal to 5.
   * If a value less than 5 is specified, it will be treated as 5.
   */
  @property({ type: Number, reflect: true })
  window = 5;

  private _goto(page: number): void {
    this.current = this.current = Math.max(Math.min(page, this.total), 1);
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  private _gotoOffset(offset: number): void {
    this._goto(this.current + offset);
  }

  override render() {
    const cvaChevron = cvaChevronButton();

    const pageArray = calculatePagination(
      this.total,
      this.current,
      this.window
    );
    return html`
      <div aria-label="Pagination" class="inline-flex gap-1">
        <button
          class=${cvaChevron}
          type="button"
          aria-label="Go to the previous page."
          ?disabled=${this.current === 1}
          @click=${() => this._gotoOffset(-1)}
        >
          <span class="i-daikin-pagination-chevron-left w-4 h-4"></span>
        </button>
        ${repeat(
          pageArray,
          (item, index) =>
            item.type === "page" ? `p${item.page}` : `e${index}`,
          (item) => {
            if (item.type === "page") {
              const buttonClassName = cvaPageButton({
                active: this.current === item.page,
              });
              return html`
                <button
                  type="button"
                  class=${buttonClassName}
                  @click=${() => this._goto(item.page)}
                  aria-label="Go to page ${item.page}"
                  aria-current=${ifDefined(
                    item.page === this.current ? "page" : undefined
                  )}
                >
                  ${item.page}
                </button>
              `;
            } else {
              return html`
                <span class=${cvaEllipsis()}>
                  <button
                    type="button"
                    disabled
                    aria-label="Expand the omitted pages."
                    class="after:content-['._._.']"
                  ></button>
                </span>
              `;
            }
          }
        )}
        <button
          type="button"
          class=${cvaChevron}
          aria-label="Go to the next page."
          ?disabled=${this.current === this.total}
          @click=${() => this._gotoOffset(1)}
        >
          <span class="i-daikin-pagination-chevron-right w-4 h-4"></span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-pagination": DaikinPagination;
  }
}
