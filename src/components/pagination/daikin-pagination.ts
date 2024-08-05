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

/**
 * A pagination switch component.
 *
 * @fires change - Emitted when the pagination switch is paginationd.
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
  @property({ type: Number, reflect: true })
  showPages = 5;

  @state()
  private _pageArray: Array<Array<number>> = [[], [], [], [], []];

  private _resetPages() {
    const tempPageArray = Array.from({ length: this.max }, (_, i) => i + 1);
    this._pageArray[0] = [tempPageArray[0]];
    this._pageArray[2] = tempPageArray.slice(1, this.showPages - 1);
    this._pageArray[3] = tempPageArray.slice(
      this.showPages - 1,
      tempPageArray[tempPageArray.length - 1] - 1
    );
    this._pageArray[4] = [tempPageArray[tempPageArray.length - 1]];
    this.requestUpdate();
  }

  private _handleClickNumber(page: number) {
    this.value = page;
  }

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left" && this.value > 1) {
      this.value -= 1;
      if (this.value < Math.min(...this._pageArray[2]) && this.value != 1) {
        const maxValue2 = Math.max(...this._pageArray[2]);
        this._pageArray[2].splice(this._pageArray[2].indexOf(maxValue2), 1);
        this._pageArray[3].unshift(maxValue2);

        const maxValue1 = Math.max(...this._pageArray[1]);
        this._pageArray[1].splice(this._pageArray[1].indexOf(maxValue1), 1);
        this._pageArray[2].unshift(maxValue1);
      }
    } else if (type === "right" && this.value < this.max) {
      this.value += 1;
      if (
        this.value > Math.max(...this._pageArray[2]) &&
        this.value != this._pageArray[4][0]
      ) {
        const minValue3 = Math.min(...this._pageArray[3]);
        this._pageArray[3].splice(this._pageArray[3].indexOf(minValue3), 1);
        this._pageArray[2].push(minValue3);

        const minValue2 = Math.min(...this._pageArray[2]);
        this._pageArray[2].splice(this._pageArray[2].indexOf(minValue2), 1);
        this._pageArray[1].push(minValue2);
      }
    }
    this.requestUpdate();
  }

  override render() {
    const cvaChevron = cvaButton({
      active: false,
    });
    return html`
      <div class="inline-flex">
        <button @click=${() => this._handleClickChevron("left")}>
          <div class="${cvaChevron} flex items-center justify-center">
            <daikin-icon icon="chevronLeft"></daikin-icon>
          </div>
        </button>
        <slot>
          ${this._pageArray.map((i, index) => {
            if (index === 1 || index === 3) {
              if (i.length > 0) {
                const ellipsisClassName = cvaButton({
                  active: false,
                });
                return html`<button
                  class=${ellipsisClassName}
                  aria-label="pageDetail"
                >
                  ${". . ."}
                </button>`;
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
          <div class="${cvaChevron} flex items-center justify-center">
            <daikin-icon icon="chevronRight"></daikin-icon>
          </div>
        </button>
      </div>
    `;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("max")) {
      this._resetPages();
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
