import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaPagination = cva([], {
  variants: {
    size: {
      default: [],
      small: [],
    },
  },
});

type PaginationVariantProps = MergeVariantProps<typeof cvaPagination>;

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

  static readonly formAssociated = true;

  // define _internals to let pagination can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  @query("input")
  private _input: HTMLInputElement | null | undefined;

  private _handleChange(event: Event) {
    if (!this._input) {
      return;
    }
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  /**
   * Specify the component size
   */
  @property({ type: String })
  size: PaginationVariantProps["size"] = "default";

  /**
   * Specify whether the Pagination should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the control is checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The form name.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The value.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Specify whether the Pagination is in a error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  override render() {
    const paginationClassName = cvaPagination({ size: this.size });

    return html`<input
      class=${paginationClassName}
      type="checkbox"
      name=${this.name}
      value=${this.value}
      .checked=${this.checked}
      ?disabled=${this.disabled}
      @change=${this._handleChange}
    />`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("checked")) {
      this._updateFormValue();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-pagination": DaikinPagination;
  }
}
