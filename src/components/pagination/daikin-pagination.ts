import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import { calculatePagination } from "./pagination-utils";

const cvaPageButton = cva(
  [
    "text-inherit",
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
    "text-daikinNeutral-700",
    "not-italic",
    "font-normal",
    "leading-6",
    "active:bg-daikinNeutral-100",
    "active:text-daikinNeutral-800",
    "hover:bg-[#F2F2F2]",
    "hover:text-[#515151]",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-1",
    "focus-visible:outline-[#0081C0]",
  ],
  {
    variants: {
      active: {
        true: [
          "!text-daikinBlue-500",
          "focus-visible:text-daikinBlue-600",
          "!font-bold",
          "text-daikinBlue-500",
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
        false: [],
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
 * @fires page-change - Emitted when the pagination currentPage is changed.
 *
 * @slot page-{currentPage} - A slot for the page content
 *
 * @example
 *
 * ```html
 * <!-- You can create a pagination just specify the max pages and how many pages should be show. -->
 * <daikin-pagination max="15" show-pages="5">
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
   * The current page number.
   */
  @property({ type: Number, reflect: true, attribute: "current-page" })
  currentPage = 1;

  /**
   * The last or total number of pages.
   */
  @property({ type: Number, reflect: true, attribute: "last-page" })
  lastPage = 5;

  /**
   * How many items to show at a time.
   */
  @property({ type: Number, reflect: true, attribute: "page-window" })
  pageWindow = 5;

  /**
   * @readonly
   * leftMost: mean page 1
   * leftEllipsis: mean the page which hidden in the left ellipsis button
   * middle: mean the page be showed except first page and last page
   * rightEllipsis: mean the page which hidden in the right ellipsis button
   * rightMost: mean the last page
   */
  @state()
  private _pageArray: PaginationContent = {
    leftMost: 1,
    leftEllipsis: [],
    middle: [],
    rightEllipsis: [],
    rightMost: this.lastPage,
  };

  private _initPaginationCalculator() {
    this._pageArray = calculatePagination(
      this.lastPage,
      this.currentPage,
      this.pageWindow
    );
  }

  private _handleClickNumber(page: number) {
    this.currentPage = page;
  }

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left") {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
    } else {
      if (this.currentPage === this.lastPage) {
        return;
      }
      this.currentPage += 1;
    }
  }

  override render() {
    const cvaChevron = cvaChevronButton();
    return html`
      <div class="inline-flex gap-1">
        <button
          class=${cvaChevron}
          aria-label="leftChevron"
          .disabled=${this.currentPage === 1}
          @click=${() => this._handleClickChevron("left")}
        >
          <div class="flex items-center justify-center">
            <daikin-icon
              icon="pagination-chevron-left"
              color="current"
            ></daikin-icon>
          </div>
        </button>

        ${Object.entries(this._pageArray).map(([key, i]) => {
          const button1ClassName = cvaPageButton({
            active: this.currentPage === 1,
          });
          const buttonLastClassName = cvaPageButton({
            active: this.currentPage === this.lastPage,
          });
          const ellipsisClassName = cvaEllipsis();
          if (key === "leftMost") {
            return html`
              <button
                name="page-1"
                class=${button1ClassName}
                @click=${() => this._handleClickNumber(1)}
                aria-label="page1"
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
                    .disabled=${true}
                    aria-disabled=${true}
                    aria-label="pageDetailLeft"
                  >
                    ${". . ."}
                  </button>
                </div>
              </div>`;
            }
          } else if (key === "middle") {
            const showPages = i as Array<number>;
            return html`${showPages.map((page) => {
              const buttonClassName = cvaPageButton({
                active: this.currentPage === page,
              });
              return html`
                <button
                  name="page-${page}"
                  class=${buttonClassName}
                  @click=${() => this._handleClickNumber(page)}
                  aria-label="page${page}"
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
                  >
                    ${". . ."}
                  </button>
                </div>
              </div>`;
            }
          } else {
            return html`
              <button
                name="page-${this.lastPage}"
                class=${buttonLastClassName}
                @click=${() => this._handleClickNumber(this.lastPage)}
                aria-label="page${this.lastPage}"
              >
                ${this.lastPage}
              </button>
            `;
          }
        })}
        <button
          class=${cvaChevron}
          aria-label="rightChevron"
          .disabled=${this.currentPage === this.lastPage}
          @click=${() => this._handleClickChevron("right")}
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

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has("lastPage") ||
      changedProperties.has("pageWindow")
    ) {
      this._initPaginationCalculator();
    }
    if (changedProperties.has("currentPage")) {
      this._pageArray = calculatePagination(
        this.lastPage,
        this.currentPage,
        this.pageWindow
      );
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { page: this.currentPage },
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-pagination": DaikinPagination;
  }
}
