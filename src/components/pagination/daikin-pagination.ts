import "#package/components/icon/daikin-icon";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
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
  max = 1;

  private _handleClickNumber(page: number) {
    this.value = page;
  }

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left" && this.value > 1) {
      this.value -= 1;
    } else if (type === "right" && this.value < this.max) {
      this.value += 1;
    }
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
          ${map(range(1, this.max + 1), (i) => {
            const buttonClassName = cvaButton({
              active: this.value === i,
            });
            return html`<button
              aria-label="page${i}"
              class=${buttonClassName}
              value=${i}
              @click=${() => this._handleClickNumber(i)}
            >
              ${i}
            </button>`;
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

  protected override updated(): void {
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
