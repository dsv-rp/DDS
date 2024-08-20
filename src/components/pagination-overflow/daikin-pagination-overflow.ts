import "#package/components/icon/daikin-icon";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaDropDownIcon = cva(["flex", "w-8", "items-center", "justify-center"], {
  variants: {
    open: {
      false: [],
      true: ["rotate-180"],
    },
  },
});

const cvaChevron = cva([
  "flex",
  "w-12",
  "items-center",
  "justify-center",
  "border-daikinBlue-600",
  "hover:border-b",
  "hover:border-solid",
  "focus-visible:outline-none",
  "focus-visible:border-b-2",
  "focus-visible:border-solid",
]);

const cvaDropDown = cva(
  [
    "flex",
    "flex-col",
    "items-center",
    "flex-shrink-0",
    "w-12",
    "mt-3",
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

const cvaDropDownItem = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "px-4",
    "py-[2px]",
    "w-full",
    "font-daikinSerif",
    "text-sm",
    "not-italic",
    "font-normal",
    "leading-5",
    "border-t",
    "border-r",
    "border-l",
    "border-solid",
    "border-daikinNeutral-600",
    "first:border-t-0",
    "hover:bg-daikinNeutral-100",
  ],
  {
    variants: {
      active: {
        false: [],
        true: ["bg-daikinNeutral-100"],
      },
    },
  }
);

/**
 * A pagination switch component.
 *
 * @fires change - Emitted when the pagination switch is pagination.
 */
@customElement("daikin-pagination-overflow")
export class DaikinPaginationOverflow extends LitElement {
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
   * The total items.
   */
  @property({ type: Number, reflect: true, attribute: "total-items" })
  totalItems = 5;

  @state()
  open = false;

  @state()
  totalPages = 1;

  @state()
  itemFrom = 1;

  @state()
  itemTo = this.max;

  private _handleClickNumber(value: number) {
    this.value = value;
    this.open = false;
  }

  private _handleClickArrow() {
    if (this.totalPages > 1) {
      this.open = !this.open;
    }
  }

  private _handleClickChevron(type: "left" | "right") {
    if (type === "left" && this.value > 1) {
      this.value -= 1;
    } else if (type === "right" && this.value < this.totalPages) {
      this.value += 1;
    }
    this.open = false;
  }

  private _handleWindowClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.nodeName != "DAIKIN-PAGINATION-OVERFLOW") {
      this.open = false;
    }
  }

  override render() {
    const cvaDropDownClassName = cvaDropDown({
      open: this.open,
    });

    const cvaChevronClassName = cvaChevron();

    const cvaDropDownIconClassName = cvaDropDownIcon({ open: this.open });

    const dropDownMenu = html`<div class=${cvaDropDownClassName}>
      ${map(range(1, this.totalPages + 1), (j) => {
        const dropDownItemClassName = cvaDropDownItem({
          active: this.value === j,
        });
        return html`
          <button
            name="page-${j}"
            class=${dropDownItemClassName}
            value=${j}
            @click=${() => this._handleClickNumber(j)}
            @keydown=${() => {
              return;
            }}
            aria-label="page${j}"
          >
            ${j}
          </button>
        `;
      })}
    </div>`;

    return html`
      <div
        class="inline-flex h-12 text-daikinNeutral-800 font-daikinSerif text-[15px] not-italic font-medium leading-[22px]"
      >
        <div class="flex items-center justify-center py-3 px-[17px] flex-col ">
          ${this.itemFrom}-${this.itemTo} / ${this.totalItems}
        </div>
        <div
          class="flex w-12 items-center justify-center py-[13px] px-[5px] ml-4"
        >
          page:
        </div>

        <div class="relative">
          ${!this.open
            ? html`<div
                class="flex w-12 items-center justify-center py-[13px] px-[5px]"
              >
                ${this.value}
              </div>`
            : dropDownMenu}
        </div>

        <button
          aria-label="arrow"
          class=${cvaDropDownIconClassName}
          @click=${this._handleClickArrow}
        >
          <daikin-icon icon="arrowUp"></daikin-icon>
        </button>

        <button
          aria-label="chevronLeft"
          class=${cvaChevronClassName}
          @click=${() => this._handleClickChevron("left")}
        >
          <daikin-icon icon="chevronLeft"></daikin-icon>
        </button>

        <button
          aria-label="chevronRight"
          class=${cvaChevronClassName}
          @click=${() => this._handleClickChevron("right")}
        >
          <daikin-icon icon="chevronRight"></daikin-icon>
        </button>
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
    if (changedProperties.has("max") || changedProperties.has("totalItems")) {
      if (this.totalItems === this.max) {
        this.totalPages = 1;
      } else if (this.totalItems % this.max === 0) {
        this.totalPages = this.totalItems / this.max;
      } else {
        this.totalPages = Math.ceil(this.totalItems / this.max);
      }
    }
    if (changedProperties.has("value")) {
      if (this.value === 1) {
        this.itemFrom = 1;
        this.itemTo = this.max;
      } else if (this.value === this.totalPages) {
        this.itemFrom = (this.value - 1) * this.max;
        this.itemTo = this.totalItems;
      } else {
        this.itemFrom = (this.value - 1) * this.max;
        this.itemTo = (this.value - 1) * this.max + this.max;
      }
      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: {
            page: this.value,
            offset: this.itemFrom,
            limit: this.itemTo,
          },
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
    "daikin-pagination-overflow": DaikinPaginationOverflow;
  }
}
