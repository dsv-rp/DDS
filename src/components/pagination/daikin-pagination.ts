import "#package/components/icon/daikin-icon";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaButton = cva(
  [
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

/**
 * A pagination component.
 *
 * @fires change - Emitted when the pagination value is changed.
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
   * The value.
   */
  @property({ type: Number, reflect: true })
  value = 1;

  /**
   * The max.
   */
  @property({ type: Number, reflect: true })
  max = 5;

  /**
   * The show pages.
   */
  @property({ type: Number, reflect: true, attribute: "show-pages" })
  showPages = 5;

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
    return Array.from({ length: this.max }, (_, i) => i + 1);
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
      this.showPages - 1
    );
    this._pageArray[this._PageIndex.RightDropDown] = allPagesArray.slice(
      this.showPages - 1,
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
      -this.showPages + 1
    );
    this._pageArray[this._PageIndex.ShowPages] = allPagesArray.slice(
      -this.showPages + 1,
      -1
    );
    this._pageArray[this._PageIndex.LastPage] = [
      allPagesArray[allPagesArray.length - 1],
    ];
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _handleClickNumber(page: number) {
    this.value = page;
    this._closeDropDownMenu();
  }

  // Move the min value from RightDropDown to ShowPages
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

  // Move the min value from ShowPages to LeftDropDown
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

  // Move the max value from showPages to rightDropDown
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

  // Move the max value from leftDropDown to showPages
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

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left") {
      if (this.value === 1) {
        return;
      }
      this.value -= 1;
      if (
        this.value < Math.min(...this._pageArray[this._PageIndex.ShowPages]) &&
        this.value != 1
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
        this.value === this.max - 1 &&
        this._pageArray[this._PageIndex.RightDropDown].length > 0
      ) {
        this._resetPagesEnd();
      }
    } else {
      if (this.value === this.max) {
        return;
      }
      this.value += 1;
      if (
        this.value > Math.max(...this._pageArray[this._PageIndex.ShowPages]) &&
        this.value != this._pageArray[this._PageIndex.LastPage][0]
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
        this.value === 2 &&
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

  private _handleChoosePageRight(value: number) {
    this.value = value;
    if (this.value >= this.max - 2) {
      this._resetPagesEnd();
      return;
    }
    // move RightDropDown to ShowPages to show
    const moveCount1 = this._pageArray[this._PageIndex.RightDropDown].filter(
      (x) => x <= value
    ).length;
    for (let i = 0; i < moveCount1; i++) {
      this._moveMinValueLeftShow();
    }
    // move ShowPages to LeftDropDown to hide
    const moveCount2 =
      this._pageArray[this._PageIndex.ShowPages].length - (this.showPages - 3);
    for (let j = 0; j < moveCount2; j++) {
      this._moveMinValueLeftOmission();
    }
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _handleChoosePageLeft(value: number) {
    this.value = value;
    if (this.value <= 3) {
      this._resetPagesStart();
      return;
    }
    // move LeftDropDown to ShowPages to show
    const moveCount1 = this._pageArray[this._PageIndex.LeftDropDown].filter(
      (x) => x >= value
    ).length;
    for (let i = 0; i < moveCount1; i++) {
      this._moveMaxValueRightShow();
    }
    // move ShowPages to RightDropDown to hide
    const moveCount2 =
      this._pageArray[this._PageIndex.ShowPages].length - (this.showPages - 3);
    for (let i = 0; i < moveCount2; i++) {
      this._moveMaxValueRightOmission();
    }
    this._closeDropDownMenu();
    this.requestUpdate();
  }

  private _handleWindowClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.nodeName != "DAIKIN-PAGINATION") {
      this._closeDropDownMenu();
    }
  }

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
          const dropDownItemClassName =
            "flex justify-center items-center px-4 py-[2px] w-full font-daikinSerif text-sm not-italic font-normal leading-5 border-t first:border-t-0 border-r border-l border-solid border-daikinNeutral-600 hover:bg-daikinNeutral-100";
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
                  ${i.map((value) => {
                    return html`<slot
                      name="page-${value}"
                      class=${dropDownItemClassName}
                      value=${value}
                      @click=${() => this._handleChoosePageLeft(value)}
                      @keydown=${() => this._handleChoosePageLeft(value)}
                    >
                      <button>${value}</button>
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
                  ${i.map((value) => {
                    return html`<slot
                      name="page-${value}"
                      class=${dropDownItemClassName}
                      value=${value}
                      @click=${() => this._handleChoosePageRight(value)}
                      @keydown=${() => this._handleChoosePageRight(value)}
                    >
                      <button>${value}</button>
                    </slot>`;
                  })}
                </div>
              </div>`;
            }
          }
          return html`${i.map((j) => {
            const buttonClassName = cvaButton({
              active: this.value === j,
            });
            return html`<slot
              name="page-${j}"
              class=${buttonClassName}
              value=${j}
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
            class=${cvaChevron}
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
    window.addEventListener("click", (event) => {
      this._handleWindowClick(event);
    });
  }

  override disconnectedCallback(): void {
    window.removeEventListener("click", (event) => {
      this._handleWindowClick(event);
    });
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("max")) {
      this._resetPagesStart();
    }
    if (changedProperties.has("value")) {
      if (this._pageArray[this._PageIndex.LeftDropDown].includes(this.value)) {
        this._handleChoosePageLeft(this.value);
      } else if (
        this._pageArray[this._PageIndex.RightDropDown].includes(this.value)
      ) {
        this._handleChoosePageRight(this.value);
      }
    }
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page: this.value },
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
