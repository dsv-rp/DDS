import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinInputGroup } from "../input-group";

const cvaInput = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "h-full",
    "relative",
    "px-2",
    "rounded-md",
    "overflow-hidden",
    "font-daikinSerif",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",
    "placeholder:text-[#616161]",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "enabled:text-[#414141]",
    "enabled:hover:bg-[#f2f2f2]",
    "enabled:active:bg-[#EBEBEB]",
    "focus-visible:outline-2",

    "disabled:var-color-[#BFBFBF]/color-base",
    "disabled:text-[#BFBFBF]",
    "disabled:bg-white",
    "disabled:placeholder:text-[#BFBFBF]",
  ],
  {
    variants: {
      error: {
        false: [
          "enabled:var-color-[#515151]/color-base",
          "focus-visible:var-color-[#0081C0]/color-state-focus",
        ],
        true: ["enabled:var-color-[#D80C18]/color-base"],
      },
      leftIcon: {
        false: ["pl-4"],
        true: ["pl-11"],
      },
      rightIcon: {
        false: ["pr-4"],
        true: ["pr-11"],
      },
    },
  }
);

const cvaIcon = cva(["absolute", "pointer-events-none"], {
  variants: {
    icon: {
      left: "left-3",
      right: "right-3",
    },
    disabled: {
      false: ["text-[#414141]"],
      true: ["text-[#BFBFBF]"],
    },
  },
});

/**
 * The text field component is a UI element that allows users to input single-line text data.
 * It functions similarly to the HTML `<input type="text">` tag, providing a simple and efficient way for users to enter and edit short pieces of texts, such as names, email addresses, or search queries.
 * Can be used within `daikin-input-group` component.
 *
 * Hierarchies:
 * - `daikin-text-field` (can be used solely)
 * - `daikin-input-group` > `daikin-text-field`
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input>` element.
 * @fires input - A retargeted event of a [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
 *
 * @slot left-icon - Specify the icon you want to use on the left. You can also use something other than `daikin-icon`.
 * @slot right-icon - Specify the icon you want to use on the right. You can also use something other than `daikin-icon`.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/text-field/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-input-group` component for complete example. -->
 * <daikin-text-field name="name"></daikin-text-field>
 * ```
 */
@customElement("daikin-text-field")
export class DaikinTextField extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
      height: 48px;
      position: relative;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Type of the text field.
   */
  @property({ type: String })
  type: "text" | "email" | "tel" | "search" = "text";

  /**
   * Value of the text field.
   */
  @property({ type: String })
  value = "";

  /**
   * Form name of the text field.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Placeholder text.
   */
  @property({ type: String })
  placeholder: string | null = null;

  /**
   * Whether the text field is readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the text field is disabled.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the text field is required.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether or not to display error states.
   * Ignored if the `disabled` is `true`.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Maximum length of value.
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Value of `autocomplete` attribute of the internal `<input>`.
   */
  @property({ type: String })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * This label text will be used as `aria-label` and invisible.
   */
  @property({ type: String, reflect: true })
  label: string | null = null;

  @state()
  private _hasLeftIcon = false;

  @state()
  private _hasRightIcon = false;

  private _handleSlotChange(event: Event) {
    const target = event.target as HTMLSlotElement;
    const name = target.name;
    const hasIcon = !!target.assignedNodes().length;

    switch (name) {
      case "left-icon":
        this._hasLeftIcon = hasIcon;
        break;

      case "right-icon":
        this._hasRightIcon = hasIcon;
        break;
    }
  }

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  override render() {
    const isError = !this.disabled && this.error;

    return html`<input
        class=${cvaInput({
          error: isError,
          leftIcon: this._hasLeftIcon,
          rightIcon: this._hasRightIcon,
        })}
        type=${this.type}
        value=${this.value}
        placeholder=${ifDefined(this.placeholder ?? undefined)}
        name=${ifDefined(this.name)}
        maxlength=${ifDefined(this.maxlength)}
        autocomplete=${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
          ifDefined(this.autocomplete as any)
        }
        aria-label=${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
          ifDefined(this.label as any)
        }
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
        @input=${this._handleInput}
      />
      <div class=${cvaIcon({ icon: "left", disabled: this.disabled })}>
        <slot name="left-icon" @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div class=${cvaIcon({ icon: "right", disabled: this.disabled })}>
        <slot name="right-icon" @slotchange=${this._handleSlotChange}></slot>
      </div>`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._internals.setFormValue(this.value);
  }

  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    this.label = inputGroup.label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-field": DaikinTextField;
  }
}
