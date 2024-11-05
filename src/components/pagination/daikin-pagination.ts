import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
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
    "focus-visible:outline-[#0081C0]",
  ],
  {
    variants: {
      active: {
        true: [
          "text-daikinBlue-500",
          "focus-visible:text-daikinBlue-500",
          "font-bold",
          "hover:text-[#0081C0]",
          "hover:bg-[#DDF3FC]",
          "active:text-[#00689A]",
          "active:bg-[#BBE7F9]",
          "after:bg-daikinBlue-500",
          "after:content-['']",
          "after:h-1",
          "after:absolute",
          "after:inset-0",
          "after:top-auto",
        ],
        false: [
          "text-inherit",
          "font-normal",
          "text-daikinNeutral-700",
          "active:bg-daikinNeutral-100",
          "active:text-daikinNeutral-800",
          "hover:bg-[#F2F2F2]",
          "hover:text-[#515151]",
        ],
      },
    },
  }
);

const cvaEllipsis = cva([
  "text-inherit",
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
]);

const cvaChevronButton = cva([
  "text-inherit",
  "border-0",
  "no-underline",
  "flex",
  "items-center",
  "justify-center",
  "w-12",
  "h-12",
  "text-[#515151]",
  "font-daikinSerif",
  "text-base",
  "not-italic",
  "font-normal",
  "leading-6",
  "hover:bg-[#F2F2F2]",
  "hover:text-daikinNeutral-800",
  "active:bg-daikinNeutral-100",
  "active:text-daikinNeutral-900",
  "disabled:!text-daikinNeutral-400",
  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-1",
  "focus-visible:outline-[#0081C0]",
]);

/**
 * leftMost: mean page 1
 * leftEllipsis: mean the page which hidden in the left ellipsis button
 * middle: mean the page be showed except first page and last page
 * rightEllipsis: mean the page which hidden in the right ellipsis button
 * rightMost: mean the last page
 */
export interface PaginationContent {
  leftMost: number;
  leftEllipsis: number[];
  middle: number[];
  rightEllipsis: number[];
  rightMost: number;
}

/**
 * The pagination component is used to navigate through a list of items that are divided into multiple pages.
 *
 * @fires change - Emitted when the pagination current is changed.
 *
 * @slot page-{current} - A slot for the page content
 *
 * @example
 *
 * ```html
 * <!-- You can create a pagination just specify the max pages and how many pages should be show. -->
 * <daikin-pagination total="5" window="5">
 * </daikin-pagination>
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
  total = 5;

  /**
   * Number of elements to display in pagination, including chevrons and ellipses.
   */
  @property({ type: Number, reflect: true })
  window = 5;

  private _goto(page: number): void {
    this.current = Math.max(page, 1);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { page: this.current },
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
      <div class="inline-flex gap-1">
        <button
          class=${cvaChevron}
          aria-label="leftChevron"
          .disabled=${this.current === 1}
          @click=${() => this._gotoOffset(-1)}
        >
          <div class="flex items-center justify-center">
            <daikin-icon
              icon="pagination-chevron-left"
              color="current"
            ></daikin-icon>
          </div>
        </button>

        ${Object.entries(pageArray).map(([key, i]) => {
          const button1ClassName = cvaPageButton({
            active: this.current === 1,
          });
          const buttonLastClassName = cvaPageButton({
            active: this.current === this.total,
          });
          const ellipsisClassName = cvaEllipsis();
          if (key === "leftMost") {
            return html`
              <button
                type="button"
                class=${button1ClassName}
                @click=${() => this._goto(1)}
                aria-label="Page 1"
              >
                1
              </button>
            `;
          } else if (key === "leftEllipsis") {
            const leftEllipsisPages = i as Array<number>;
            if (leftEllipsisPages.length > 0) {
              return html`<div class="relative">
                <div class=${ellipsisClassName}>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    aria-label="Expand the omitted earlier pages."
                    class="after:content-['._._.']"
                  ></button>
                </div>
              </div>`;
            }
          } else if (key === "middle") {
            const showPages = i as Array<number>;
            return html`${showPages.map((page) => {
              const buttonClassName = cvaPageButton({
                active: this.current === page,
              });
              return html`
                <button
                  name="page-${page}"
                  class=${buttonClassName}
                  @click=${() => this._goto(page)}
                  aria-label="Page ${page}"
                >
                  ${page}
                </button>
              `;
            })}`;
          } else if (key === "rightEllipsis") {
            const rightEllipsisPages = i as Array<number>;
            if (rightEllipsisPages.length > 0) {
              return html`<div class="relative">
                <div class=${ellipsisClassName}>
                  <button
                    .disabled=${true}
                    aria-disabled=${true}
                    aria-label="pageDetailRight"
                    class="after:content-['._._.']"
                  ></button>
                </div>
              </div>`;
            }
          } else {
            return html`
              <button
                name="page-${this.total}"
                class=${buttonLastClassName}
                @click=${() => this._goto(this.total)}
                aria-label="Page ${this.total}"
              >
                ${this.total}
              </button>
            `;
          }
        })}
        <button
          class=${cvaChevron}
          aria-label="rightChevron"
          .disabled=${this.current === this.total}
          @click=${() => this._gotoOffset(1)}
        >
          <div class="flex items-center justify-center">
            <daikin-icon
              icon="pagination-chevron-right"
              color="current"
            ></daikin-icon>
          </div>
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
