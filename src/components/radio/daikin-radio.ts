import { cva } from "class-variance-authority";
import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
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
  "focus-visible:outline-ddt-color-common-border-focus",

  "unchecked:border-2",
  "enabled:unchecked:border-ddt-color-common-neutral-default",
  "enabled:unchecked:group-hover:border-ddt-color-common-neutral-hover",
  "enabled:unchecked:group-active:border-ddt-color-common-neutral-press",
  "enabled:unchecked:group-hover:bg-ddt-color-common-surface-neutral-hover",
  "enabled:unchecked:group-active:bg-ddt-color-common-surface-neutral-press",
  "checked:border-[5px]",
  "enabled:checked:border-ddt-color-common-brand-default",
  "enabled:checked:group-hover:border-ddt-color-common-brand-hover",
  "enabled:checked:group-active:border-ddt-color-common-brand-press",
  "disabled:border-ddt-color-common-disabled",
])();

const cvaLabel = cva(["pr-2"], {
  variants: {
    disabled: {
      false: ["text-ddt-color-common-text-primary"],
      true: ["text-ddt-color-common-disabled"],
    },
  },
});

/**
 * The radio button component is a UI element that allows users to select one options from a set of choices.
 * It functions similarly to the HTML `<input type="radio">` tag. \
 * Please note that **a radio group component is not yet available**, so you'll need to manually group radio buttons when using multiple instances.
 *
 * Hierarchies:
 * - `daikin-radio-group` > `daikin-radio`
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
    }
  `;

  /**
   * The form name, submitted as a name/value pair when submitting the form.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The form value, submitted as a name/value pair when submitting the form.
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
   * Specify the radio button checked state.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Specify the radio button disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the radio button can be focused.
   * Automatically set by `daikin-radio-group` component.
   */
  @property({ type: Boolean, attribute: false })
  skipTab = false;

  static readonly formAssociated = true;

  @query("input")
  private _radio!: HTMLInputElement | null;

  /**
   * Focuses on the inner radio.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._radio?.focus(options);
  }

  // Define internals to let the radio button can be used in a form.
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
    }

    // Prevent click event from being emitted twice.
    // https://stackoverflow.com/q/24501497
    if ((event.target as HTMLElement | null)?.tagName !== "INPUT") {
      event.stopPropagation();
    }
  }

  private _handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue();
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    // We have to attach event listener to the root element instead of `this` to access non-encapsulated `event.target`.
    // eslint-disable-next-line lit-a11y/click-events-have-key-events -- We're listening to "click" event only for suppressing purposes.
    return html`<label
      class="group flex gap-2 items-center font-daikinSerif"
      @click=${this._handleClick}
    >
      <span class="p-2">
        <input
          class=${RADIO_CLASS_NAME}
          type="radio"
          name=${this.name}
          aria-label=${this.labelPosition === "hidden" ? this.label : nothing}
          tabindex=${ifDefined(this.skipTab ? "-1" : undefined)}
          ?disabled=${this.disabled}
          .checked=${this.checked}
          .value=${this.value}
          @change=${this._handleChange}
        />
      </span>
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
