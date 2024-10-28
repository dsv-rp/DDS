import { cva } from "class-variance-authority";
import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { color } from "../../colorToken";
import tailwindStyles from "../../tailwind.css?inline";

const RADIO_CLASS_NAME = cva([
  "flex",
  "justify-center",
  "items-center",
  "size-4",
  "rounded-full",
  "relative",
  "appearance-none",

  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-[--state-focus]",

  "unchecked:border-2",
  "enabled:unchecked:border-[--state-neutral-active]",
  "enabled:unchecked:hover:bg-[--background-surface-hover]",
  "enabled:unchecked:active:bg-[--background-surface-press]",
  "checked:border-[5px]",
  "enabled:checked:border-[--state-primary-active]",
  "enabled:checked:group-hover:border-[--state-primary-hover]",
  "enabled:checked:group-active:border-[--state-primary-press]",
  "disabled:border-[--state-disabled]",
])();

const cvaLabel = cva(["pr-2"], {
  variants: {
    disabled: {
      false: ["text-[--element-text-primary]"],
      true: ["text-[--state-disabled]"],
    },
  },
});

/**
 * The radio button component is a UI element that allows users to select one options from a set of choices.
 * It functions similarly to the HTML `<input type="radio">` tag. \
 * Please note that **a radio group component is not yet available**, so you'll need to manually group radio buttons when using multiple instances.
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input type="radio">` element.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/radio/index.js";
 * ```
 *
 * ```html
 *  <daikin-radio name="name" value="value" label="Radio button label"></daikin-radio>
 * ```
 */
@customElement("daikin-radio")
export class DaikinRadio extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
      --element-text-primary: ${unsafeCSS(color.element.text.primary)};
      --background-surface-hover: ${unsafeCSS(color.background.surface.hover)};
      --background-surface-press: ${unsafeCSS(color.background.surface.press)};
      --state-primary-active: ${unsafeCSS(color.state.primary.active)};
      --state-primary-hover: ${unsafeCSS(color.state.primary.hover)};
      --state-primary-press: ${unsafeCSS(color.state.primary.press)};
      --state-neutral-active: ${unsafeCSS(color.state.neutral.active)};
      --state-focus: ${unsafeCSS(color.state.focus)};
      --state-disabled: ${unsafeCSS(color.state.disabled)};
    }
  `;

  /**
   * Form name of the radio button.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Form value of the radio button.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Label text for the radio button.
   */
  @property({ type: String })
  label = "";

  /**
   * Label position.
   * - `right` (default): The label will be placed to the right of the radio button.
   * - `hidden`: The label will not be shown.
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: "right" | "hidden" = "right";

  /**
   * Whether the radio button is checked.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the radio button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static readonly formAssociated = true;

  // Define internals to let the radio button can be used in a form.
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
    }
  }

  private _handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  override render() {
    return html`<label class="group flex gap-2 items-center font-daikinSerif">
      <div class="p-2">
        <input
          class=${RADIO_CLASS_NAME}
          type="radio"
          name=${this.name}
          value=${this.value}
          aria-label=${this.labelPosition === "hidden" ? this.label : nothing}
          ?disabled=${this.disabled}
          .checked=${this.checked}
          @click=${this._handleClick}
          @change=${this._handleChange}
        />
      </div>
      <span
        class=${cvaLabel({
          disabled: this.disabled,
        })}
        ?hidden=${this.labelPosition === "hidden"}
      >
        ${this.label}
      </span>
    </label>`;
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("checked")) {
      this._updateFormValue();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio": DaikinRadio;
  }
}
