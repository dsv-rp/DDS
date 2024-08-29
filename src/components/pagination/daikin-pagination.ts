import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import { calculatePagination } from "./pagination-utils";

const cvaButton = cva(
  [
    "slotted:text-inherit",
    "slotted:border-0",
    "slotted:no-underline",
    "slotted:flex",
    "slotted:items-center",
    "slotted:justify-center",
    "slotted:w-12",
    "slotted:h-12",
    "slotted:font-daikinSerif",
    "slotted:text-base",
    "slotted:not-italic",
    "slotted:font-normal",
    "slotted:leading-6",
    "slotted:!border-daikinBlue-600",
    "slotted:hover:!border-b",
    "slotted:hover:!border-solid",
    "slotted-[*:focus-visible]:outline-none",
    "slotted-[*:focus-visible]:!border-b-2",
    "slotted-[*:focus-visible]:border-solid",
    "slotted-[*:focus-visible]:border-daikinBlue-600",
  ],
  {
    variants: {
      active: {
        true: [
          "slotted:!text-daikinBlue-600",
          "slotted:!border-b-2",
          "slotted:border-solid",
        ],
        false: ["slotted:hover:!border-b"],
      },
    },
  }
);

const cvaDropDown = cva(
  [
    "flex",
    "flex-col",
    "justify-start",
    "items-center",
    "flex-shrink-0",
    "absolute",
    "w-12",
    "mt-[3px]",
    "max-h-[226px]",
    "overflow-auto",
    "border-t",
    "rounded-t",
    "border-b",
    "rounded-b",
    "border-daikinNeutral-600",
  ],
  {
    variants: {
      open: {
        false: ["hidden"],
        true: [],
      },
    },
  }
);

const cvaDropDownItem = cva([
  "slotted:box-border",
  "slotted:text-inherit",
  "slotted:border-0",
  "slotted:no-underline",
  "slotted:flex",
  "slotted:justify-center",
  "slotted:items-center",
  "slotted:px-4",
  "slotted:py-[2px]",
  "slotted:w-full",
  "slotted:font-daikinSerif",
  "slotted:text-sm",
  "slotted:not-italic",
  "slotted:font-normal",
  "slotted:leading-5",
  "slotted:border-t",
  "slotted:first:border-t-0",
  "slotted:border-r",
  "slotted:border-l",
  "slotted:border-solid",
  "slotted:border-daikinNeutral-600",
  "slotted:hover:bg-daikinNeutral-100",
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
 *
 * ```html
 * <!-- You can use a tag to replace the default page button. -->
 * <daikin-pagination max="5" show-pages="5">
 *  <a slot="page-1" href={url1}>1</a>
 *  <a slot="page-2" href={url2}>2</a>
 *  <a slot="page-3" href={url3}>3</a>
 *  <a slot="page-4" href={url4}>4</a>
 *  <a slot="page-5" href={url5}>5</a>
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

  @state()
  private _leftDropDownOpen = false;

  @state()
  private _rightDropDownOpen = false;

  private _closeDropDownMenu() {
    this._leftDropDownOpen = false;
    this._rightDropDownOpen = false;
  }

  private _handleClickNumber(page: number) {
    this.currentPage = page;
    this._closeDropDownMenu();
  }

  // If user replace <a> tag to page slot, this function will simulate click the page button
  private _clickATag() {
    const slot = this.shadowRoot?.querySelector(
      `slot[name=page-${this.currentPage}]`
    ) as HTMLSlotElement;
    const a = slot.assignedElements()[0] as HTMLElement | null | undefined;
    if (a && a.tagName === "A") {
      a.click();
    }
  }

  // Chose page from ellipsis button
  private _handleChoosePage(currentPage: number) {
    this.currentPage = currentPage;
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
    this._clickATag();
  }

  private _handleLeftEllipsisClick() {
    this._leftDropDownOpen = !this._leftDropDownOpen;
    this._rightDropDownOpen = false;
  }

  private _handleRightEllipsisClick() {
    this._rightDropDownOpen = !this._rightDropDownOpen;
    this._leftDropDownOpen = false;
  }

  private _handleWindowClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.nodeName != "DAIKIN-PAGINATION") {
      this._closeDropDownMenu();
    }
  };

  override render() {
    const cvaChevron = cvaButton({
      active: false,
    });
    return html`
      <div class="inline-flex">
        <div class=${cvaChevron}>
          <button
            aria-label="leftChevron"
            @click=${() => this._handleClickChevron("left")}
          >
            <div class="flex items-center justify-center">
              <daikin-icon icon="chevronLeft"></daikin-icon>
            </div>
          </button>
        </div>

        ${Object.entries(this._pageArray).map(([key, i]) => {
          const button1ClassName = cvaButton({
            active: this.currentPage === 1,
          });
          const buttonLastClassName = cvaButton({
            active: this.currentPage === this.lastPage,
          });
          const ellipsisClassName = cvaButton({
            active: false,
          });
          const dropDownItemClassName = cvaDropDownItem();
          if (key === "leftMost") {
            return html`<slot
              name="page-1"
              class=${button1ClassName}
              @click=${() => this._handleClickNumber(1)}
              @keydown=${() => {
                return;
              }}
            >
              <button aria-label="page1">1</button>
            </slot>`;
          } else if (key === "leftEllipsis") {
            const leftEllipsisPages = i as Array<number>;
            // TODO: We are considering whether we need dropdown to select page, so close it temporarily
            const cvaDropDownLeftClassName = cvaDropDown({
              open: this._leftDropDownOpen,
            });
            if (leftEllipsisPages.length > 0) {
              return html`<div class="relative">
                <div class=${ellipsisClassName}>
                  <button
                    aria-label="pageDetailLeft"
                    @click=${this._handleLeftEllipsisClick}
                  >
                    ${". . ."}
                  </button>
                </div>
                <div class=${cvaDropDownLeftClassName}>
                  ${leftEllipsisPages.map((page) => {
                    return html`<slot
                      name="page-${page}"
                      class=${dropDownItemClassName}
                      @click=${() => this._handleChoosePage(page)}
                      @keydown=${() => this._handleChoosePage(page)}
                    >
                      <button>${page}</button>
                    </slot>`;
                  })}
                </div>
              </div>`;
            }
          } else if (key === "middle") {
            const showPages = i as Array<number>;
            return html`${showPages.map((page) => {
              const buttonClassName = cvaButton({
                active: this.currentPage === page,
              });
              return html`<slot
                name="page-${page}"
                class=${buttonClassName}
                @click=${() => this._handleClickNumber(page)}
                @keydown=${() => {
                  return;
                }}
              >
                <button aria-label="page${page}">${page}</button>
              </slot>`;
            })}`;
          } else if (key === "rightEllipsis") {
            const rightEllipsisPages = i as Array<number>;
            // TODO: We are considering whether we need dropdown to select page, so close it temporarily
            const cvaDropDownRightClassName = cvaDropDown({
              open: this._rightDropDownOpen,
            });
            if (rightEllipsisPages.length > 0) {
              return html`<div class="relative">
                <div class=${ellipsisClassName}>
                  <button
                    aria-label="pageDetailRight"
                    @click=${this._handleRightEllipsisClick}
                  >
                    ${". . ."}
                  </button>
                </div>
                <div class=${cvaDropDownRightClassName}>
                  ${rightEllipsisPages.map((page) => {
                    return html`<slot
                      name="page-${page}"
                      class=${dropDownItemClassName}
                      @click=${() => this._handleChoosePage(page)}
                      @keydown=${() => this._handleChoosePage(page)}
                    >
                      <button>${page}</button>
                    </slot>`;
                  })}
                </div>
              </div>`;
            }
          } else {
            return html`<slot
              name="page-${this.lastPage}"
              class=${buttonLastClassName}
              @click=${() => this._handleClickNumber(this.lastPage)}
              @keydown=${() => {
                return;
              }}
            >
              <button aria-label="page${this.lastPage}">
                ${this.lastPage}
              </button>
            </slot>`;
          }
        })}
        <div class=${cvaChevron}>
          <button
            aria-label="rightChevron"
            @click=${() => this._handleClickChevron("right")}
          >
            <div class="flex items-center justify-center">
              <daikin-icon icon="chevronRight"></daikin-icon>
            </div>
          </button>
        </div>
      </div>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("click", this._handleWindowClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this._handleWindowClick);
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
      this._closeDropDownMenu();
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
