import "#package/components/icon/daikin-icon";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaButton = cva(
  [
    "w-12",
    "h-12",
    "font-daikinSerif",
    "text-base",
    "not-italic",
    "font-normal",
    "leading-6",
    "border-daikinBlue-600",
    "hover:border-b",
    "hover:border-solid",
  ],
  {
    variants: {
      active: {
        false: [],
        true: [
          "text-daikinBlue-600",
          "!border-b-2",
          "border-solid",
          "border-daikinBlue-600",
        ],
      },
    },
  }
);

const cvaDropDown = cva(
  [
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "flex-shrink-0",
    "absolute",
    "w-12",
    "mt-[3px]",
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
 * A pagination switch component.
 *
 * @fires change - Emitted when the pagination switch is pagination.
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

  @state()
  private _pageArray: Array<Array<number>> = [[], [], [], [], []];

  @state()
  private _leftDropDownOpen = false;

  @state()
  private _rightDropDownOpen = false;

  private _resetPagesStart() {
    this._pageArray = [[], [], [], [], []];
    const tempPageArray = Array.from({ length: this.max }, (_, i) => i + 1);
    this._pageArray[0] = [tempPageArray[0]];
    this._pageArray[2] = tempPageArray.slice(1, this.showPages - 1);
    this._pageArray[3] = tempPageArray.slice(
      this.showPages - 1,
      tempPageArray[tempPageArray.length - 1] - 1
    );
    this._pageArray[4] = [tempPageArray[tempPageArray.length - 1]];
    this._leftDropDownOpen = false;
    this._rightDropDownOpen = false;
    this.requestUpdate();
  }

  private _resetPagesEnd() {
    this._pageArray = [[], [], [], [], []];
    const tempPageArray = Array.from({ length: this.max }, (_, i) => i + 1);
    this._pageArray[0] = [tempPageArray[0]];

    this._pageArray[1] = tempPageArray.slice(
      1,
      tempPageArray.length - this.showPages + 1
    );
    this._pageArray[2] = tempPageArray.slice(-this.showPages + 1, -1);

    this._pageArray[4] = [tempPageArray[tempPageArray.length - 1]];
    this._leftDropDownOpen = false;
    this._rightDropDownOpen = false;
    this.requestUpdate();
  }

  private _handleClickNumber(page: number) {
    this.value = page;
  }

  private _moveMinValueLeftShow() {
    const minValue3 = Math.min(...this._pageArray[3]);
    this._pageArray[3].splice(this._pageArray[3].indexOf(minValue3), 1);
    this._pageArray[2].push(minValue3);
  }

  private _moveMinValueLeftOmission() {
    const minValue2 = Math.min(...this._pageArray[2]);
    this._pageArray[2].splice(this._pageArray[2].indexOf(minValue2), 1);
    this._pageArray[1].push(minValue2);
  }

  private _moveMaxValueRightOmission() {
    const maxValue2 = Math.max(...this._pageArray[2]);
    this._pageArray[2].splice(this._pageArray[2].indexOf(maxValue2), 1);
    this._pageArray[3].unshift(maxValue2);
  }

  private _moveMaxValueRightShow() {
    const maxValue1 = Math.max(...this._pageArray[1]);
    this._pageArray[1].splice(this._pageArray[1].indexOf(maxValue1), 1);
    this._pageArray[2].unshift(maxValue1);
  }

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left") {
      if (this.value === 1) {
        return;
      }
      this.value -= 1;
      if (this.value < Math.min(...this._pageArray[2]) && this.value != 1) {
        this._moveMaxValueRightOmission();
        if (this._pageArray[3].length === 1) {
          this._moveMaxValueRightOmission();
        }
        this._moveMaxValueRightShow();
        if (this._pageArray[1].length === 1) {
          this._moveMaxValueRightShow();
        }
      } else if (this.value === this.max - 1 && this._pageArray[3].length > 0) {
        this._resetPagesEnd();
      }
    } else {
      if (this.value === this.max) {
        return;
      }
      this.value += 1;
      if (
        this.value > Math.max(...this._pageArray[2]) &&
        this.value != this._pageArray[4][0]
      ) {
        this._moveMinValueLeftOmission();
        if (this._pageArray[1].length === 1) {
          this._moveMinValueLeftOmission();
        }
        this._moveMinValueLeftShow();
        if (this._pageArray[3].length === 1) {
          this._moveMinValueLeftShow();
        }
      } else if (this.value === 2 && this._pageArray[1].length > 0) {
        this._resetPagesStart();
      }
    }
    this.requestUpdate();
  }

  private _handleLeftEllipsisClick() {
    this._leftDropDownOpen = !this._leftDropDownOpen;
  }

  private _handleRightEllipsisClick() {
    this._rightDropDownOpen = !this._rightDropDownOpen;
  }

  private _handleBlurFromLeftDropDown(event: FocusEvent) {
    const clickTarget = event.relatedTarget as HTMLButtonElement | null;
    if (!clickTarget || clickTarget.name != "dropDownItemLeft") {
      this._leftDropDownOpen = false;
      this._rightDropDownOpen = false;
    }
  }

  private _handleBlurFromRightDropDown(event: FocusEvent) {
    const clickTarget = event.relatedTarget as HTMLButtonElement | null;
    if (!clickTarget || clickTarget.name != "dropDownItemRight") {
      this._leftDropDownOpen = false;
      this._rightDropDownOpen = false;
    }
  }

  private _handleChosePageRight(value: number) {
    this.value = value;
    if (this.value >= this.max - 2) {
      this._resetPagesEnd();
      return;
    }
    // move 4 to 3 to show
    const moveCount1 = this._pageArray[3].filter((x) => x <= value).length;
    for (let i = 0; i < moveCount1; i++) {
      this._moveMinValueLeftShow();
    }
    // move 3 to 2 to hide
    const moveCount2 = this._pageArray[2].length - (this.showPages - 3);
    for (let j = 0; j < moveCount2; j++) {
      this._moveMinValueLeftOmission();
    }
    this._rightDropDownOpen = false;
    this.requestUpdate();
  }

  private _handleChosePageLeft(value: number) {
    this.value = value;
    if (this.value <= 3) {
      this._resetPagesStart();
      return;
    }
    // move 2 to 3 to show
    const moveCount1 = this._pageArray[1].filter((x) => x >= value).length;
    for (let i = 0; i < moveCount1; i++) {
      this._moveMaxValueRightShow();
    }
    // move 3 to 4 to hide
    const moveCount2 = this._pageArray[2].length - (this.showPages - 3);
    for (let i = 0; i < moveCount2; i++) {
      this._moveMaxValueRightOmission();
    }
    this._leftDropDownOpen = false;
    this.requestUpdate();
  }

  override render() {
    const cvaChevron = cvaButton({
      active: false,
    });
    return html`
      <div class="inline-flex">
        <button @click=${() => this._handleClickChevron("left")}>
          <div class="${cvaChevron} flex items-center justify-center"></div>
        </button>
        <slot>
          ${this._pageArray.map((i, index) => {
            const ellipsisClassName = cvaButton({
              active: false,
            });
            const aTagClassName =
              "flex justify-center items-center px-4 py-[2px] w-full font-daikinSerif text-sm not-italic font-normal leading-5 border-t border-r border-l border-solid border-daikinNeutral-600 first:rounded-t last:rounded-b last:border-b hover:bg-daikinNeutral-100";
            if (index === 1) {
              const cvaDropDownLeftClassName = cvaDropDown({
                open: this._leftDropDownOpen,
              });
              if (i.length > 0) {
                return html`<div class="relative">
                  <button
                    class=${ellipsisClassName}
                    aria-label="pageDetail"
                    @click=${this._handleLeftEllipsisClick}
                    @blur=${this._handleBlurFromLeftDropDown}
                  >
                    ${". . ."}
                  </button>
                  <div class=${cvaDropDownLeftClassName}>
                    ${i.map((value) => {
                      return html`<button
                        name="dropDownItemLeft"
                        class=${aTagClassName}
                        @click=${() => this._handleChosePageLeft(value)}
                      >
                        ${value}
                      </button>`;
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
                  <button
                    class=${ellipsisClassName}
                    aria-label="pageDetail"
                    @click=${this._handleRightEllipsisClick}
                    @blur=${this._handleBlurFromRightDropDown}
                  >
                    ${". . ."}
                  </button>
                  <div class=${cvaDropDownRightClassName}>
                    ${i.map((value) => {
                      return html`<button
                        name="dropDownItemRight"
                        class=${aTagClassName}
                        @click=${() => this._handleChosePageRight(value)}
                      >
                        ${value}
                      </button>`;
                    })}
                  </div>
                </div>`;
              }
            }
            return html`${i.map((j) => {
              const buttonClassName = cvaButton({
                active: this.value === j,
              });
              return html`<button
                aria-label="page${j}"
                class=${buttonClassName}
                value=${j}
                @click=${() => this._handleClickNumber(j)}
              >
                ${j}
              </button>`;
            })}`;
          })}
        </slot>
        <button @click=${() => this._handleClickChevron("right")}>
          <div class="${cvaChevron} flex items-center justify-center"></div>
        </button>
      </div>
    `;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("max")) {
      this._resetPagesStart();
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
