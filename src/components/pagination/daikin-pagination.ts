import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";

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
   * How many page number to show at a time.
   */
  @property({ type: Number, reflect: true, attribute: "page-window" })
  pageWindow = 5;

  /**
   * Using nested array to simulate paginator
   */
  @state()
  private _pageArray: Array<Array<number>> = [[], [], [], [], []];

  /**
   * @readonly
   * FirstPage: mean page 1
   * LeftDropDown: mean the page which hidden in the left ellipsis button
   * ShowPages: mean the page be showed except first page and last page
   * RightDropDown: mean the page which hidden in the right ellipsis button
   * LastPage: mean the last page
   */
  private _PageIndex = Object.freeze({
    FirstPage: 0,
    LeftDropDown: 1,
    ShowPages: 2,
    RightDropDown: 3,
    LastPage: 4,
  });

  @state()
  private _leftDropDownOpen = false;

  @state()
  private _rightDropDownOpen = false;

  private _getAllPagesArray() {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }

  private _closeDropDownMenu() {
    this._leftDropDownOpen = false;
    this._rightDropDownOpen = false;
  }

  private _resetPagesStart() {
    this._pageArray = [[], [], [], [], []];
    const allPagesArray = this._getAllPagesArray();
    this._pageArray[this._PageIndex.FirstPage] = [allPagesArray[0]];
    this._pageArray[this._PageIndex.ShowPages] = allPagesArray.slice(
      1,
      this.pageWindow - 1
    );
    this._pageArray[this._PageIndex.RightDropDown] = allPagesArray.slice(
      this.pageWindow - 1,
      allPagesArray[allPagesArray.length - 1] - 1
    );
    this._pageArray[this._PageIndex.LastPage] = [
      allPagesArray[allPagesArray.length - 1],
    ];
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _resetPagesEnd() {
    this._pageArray = [[], [], [], [], []];
    const allPagesArray = this._getAllPagesArray();
    this._pageArray[this._PageIndex.FirstPage] = [allPagesArray[0]];
    this._pageArray[this._PageIndex.LeftDropDown] = allPagesArray.slice(
      1,
      -this.pageWindow + 1
    );
    this._pageArray[this._PageIndex.ShowPages] = allPagesArray.slice(
      -this.pageWindow + 1,
      -1
    );
    this._pageArray[this._PageIndex.LastPage] = [
      allPagesArray[allPagesArray.length - 1],
    ];
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _handleClickNumber(page: number) {
    this.currentPage = page;
    this._closeDropDownMenu();
  }

  // Move the min currentPage from RightDropDown to ShowPages
  private _moveMinValueLeftShow() {
    const minValueRightDropDown = Math.min(
      ...this._pageArray[this._PageIndex.RightDropDown]
    );
    this._pageArray[this._PageIndex.RightDropDown].splice(
      this._pageArray[this._PageIndex.RightDropDown].indexOf(
        minValueRightDropDown
      ),
      1
    );
    this._pageArray[this._PageIndex.ShowPages].push(minValueRightDropDown);
  }

  // Move the min currentPage from ShowPages to LeftDropDown
  private _moveMinValueLeftOmission() {
    const minValueShowPages = Math.min(
      ...this._pageArray[this._PageIndex.ShowPages]
    );
    this._pageArray[this._PageIndex.ShowPages].splice(
      this._pageArray[this._PageIndex.ShowPages].indexOf(minValueShowPages),
      1
    );
    this._pageArray[this._PageIndex.LeftDropDown].push(minValueShowPages);
  }

  // Move the max currentPage from pageWindow to rightDropDown
  private _moveMaxValueRightOmission() {
    const maxValueShowPages = Math.max(
      ...this._pageArray[this._PageIndex.ShowPages]
    );
    this._pageArray[this._PageIndex.ShowPages].splice(
      this._pageArray[this._PageIndex.ShowPages].indexOf(maxValueShowPages),
      1
    );
    this._pageArray[this._PageIndex.RightDropDown].unshift(maxValueShowPages);
  }

  // Move the max currentPage from leftDropDown to pageWindow
  private _moveMaxValueRightShow() {
    const maxValueLeftDropDown = Math.max(
      ...this._pageArray[this._PageIndex.LeftDropDown]
    );
    this._pageArray[this._PageIndex.LeftDropDown].splice(
      this._pageArray[this._PageIndex.LeftDropDown].indexOf(
        maxValueLeftDropDown
      ),
      1
    );
    this._pageArray[this._PageIndex.ShowPages].unshift(maxValueLeftDropDown);
  }

  private _clickATag() {
    const slot = this.shadowRoot?.querySelector(
      `slot[name=page-${this.currentPage}]`
    ) as HTMLSlotElement;
    const a = slot.assignedElements()[0] as HTMLElement | null | undefined;
    if (a && a.tagName === "A") {
      a.click();
    }
  }

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left") {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
      this._clickATag();
      if (
        this.currentPage <
          Math.min(...this._pageArray[this._PageIndex.ShowPages]) &&
        this.currentPage != 1
      ) {
        this._moveMaxValueRightOmission();
        if (this._pageArray[this._PageIndex.RightDropDown].length === 1) {
          this._moveMaxValueRightOmission();
        }
        this._moveMaxValueRightShow();
        if (this._pageArray[this._PageIndex.LeftDropDown].length === 1) {
          this._moveMaxValueRightShow();
        }
      } else if (
        this.currentPage === this.lastPage - 1 &&
        this._pageArray[this._PageIndex.RightDropDown].length > 0
      ) {
        this._resetPagesEnd();
      }
    } else {
      if (this.currentPage === this.lastPage) {
        return;
      }
      this.currentPage += 1;
      this._clickATag();
      if (
        this.currentPage >
          Math.max(...this._pageArray[this._PageIndex.ShowPages]) &&
        this.currentPage != this._pageArray[this._PageIndex.LastPage][0]
      ) {
        this._moveMinValueLeftOmission();
        if (this._pageArray[this._PageIndex.LeftDropDown].length === 1) {
          this._moveMinValueLeftOmission();
        }
        this._moveMinValueLeftShow();
        if (this._pageArray[this._PageIndex.RightDropDown].length === 1) {
          this._moveMinValueLeftShow();
        }
      } else if (
        this.currentPage === 2 &&
        this._pageArray[this._PageIndex.LeftDropDown].length > 0
      ) {
        this._resetPagesStart();
      }
    }
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _handleLeftEllipsisClick() {
    this._leftDropDownOpen = !this._leftDropDownOpen;
    this._rightDropDownOpen = false;
  }

  private _handleRightEllipsisClick() {
    this._rightDropDownOpen = !this._rightDropDownOpen;
    this._leftDropDownOpen = false;
  }

  private _handleChoosePageRight(currentPage: number) {
    this.currentPage = currentPage;
    if (this.currentPage >= this.lastPage - 2) {
      this._resetPagesEnd();
      return;
    }
    // move RightDropDown to ShowPages to show
    const moveCount1 = this._pageArray[this._PageIndex.RightDropDown].filter(
      (x) => x <= currentPage
    ).length;
    for (let i = 0; i < moveCount1; i++) {
      this._moveMinValueLeftShow();
    }
    // move ShowPages to LeftDropDown to hide
    const moveCount2 =
      this._pageArray[this._PageIndex.ShowPages].length - (this.pageWindow - 3);
    for (let j = 0; j < moveCount2; j++) {
      this._moveMinValueLeftOmission();
    }
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _handleChoosePageLeft(currentPage: number) {
    this.currentPage = currentPage;
    if (this.currentPage <= 3) {
      this._resetPagesStart();
      return;
    }
    // move LeftDropDown to ShowPages to show
    const moveCount1 = this._pageArray[this._PageIndex.LeftDropDown].filter(
      (x) => x >= currentPage
    ).length;
    for (let i = 0; i < moveCount1; i++) {
      this._moveMaxValueRightShow();
    }
    // move ShowPages to RightDropDown to hide
    const moveCount2 =
      this._pageArray[this._PageIndex.ShowPages].length - (this.pageWindow - 3);
    for (let i = 0; i < moveCount2; i++) {
      this._moveMaxValueRightOmission();
    }
    this._closeDropDownMenu();
    this.requestUpdate();
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
        ${this._pageArray.map((i, index) => {
          const ellipsisClassName = cvaButton({
            active: false,
          });
          const dropDownItemClassName = cvaDropDownItem();
          if (index === 1) {
            const cvaDropDownLeftClassName = cvaDropDown({
              open: this._leftDropDownOpen,
            });
            if (i.length > 0) {
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
                  ${i.map((currentPage) => {
                    return html`<slot
                      name="page-${currentPage}"
                      class=${dropDownItemClassName}
                      @click=${() => this._handleChoosePageLeft(currentPage)}
                      @keydown=${() => this._handleChoosePageLeft(currentPage)}
                    >
                      <button>${currentPage}</button>
                    </slot>`;
                  })}
                </div>
              </div>`;
            }
          } else if (index === 3) {
            const cvaDropDownRightClassName = cvaDropDown({
              open: this._rightDropDownOpen,
            });
            if (i.length > 0) {
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
                  ${i.map((currentPage) => {
                    return html`<slot
                      name="page-${currentPage}"
                      class=${dropDownItemClassName}
                      @click=${() => this._handleChoosePageRight(currentPage)}
                      @keydown=${() => this._handleChoosePageRight(currentPage)}
                    >
                      <button>${currentPage}</button>
                    </slot>`;
                  })}
                </div>
              </div>`;
            }
          }
          return html`${i.map((j) => {
            const buttonClassName = cvaButton({
              active: this.currentPage === j,
            });
            return html`<slot
              name="page-${j}"
              class=${buttonClassName}
              @click=${() => this._handleClickNumber(j)}
              @keydown=${() => {
                return;
              }}
            >
              <button aria-label="page${j}">${j}</button>
            </slot>`;
          })}`;
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
    if (changedProperties.has("lastPage")) {
      this._resetPagesStart();
    }
    if (changedProperties.has("currentPage")) {
      if (
        this._pageArray[this._PageIndex.LeftDropDown].includes(this.currentPage)
      ) {
        this._handleChoosePageLeft(this.currentPage);
      } else if (
        this._pageArray[this._PageIndex.RightDropDown].includes(
          this.currentPage
        )
      ) {
        this._handleChoosePageRight(this.currentPage);
      }
    }
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

declare global {
  interface HTMLElementTagNameMap {
    "daikin-pagination": DaikinPagination;
  }
}
