import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaInput = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "h-full",
    "relative",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",

    "px-2",
    "pl-[--input-padding-left]",
    "pr-[--input-padding-right]",
    "rounded-md",
    "overflow-hidden",
    "font-daikinSerif",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",

    "placeholder:text-daikinNeutral-700",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "enabled:text-daikinNeutral-800",
    "enabled:hover:bg-[#f2f2f2]",
    "enabled:active:bg-daikinNeutral-100",
    "focus-visible:outline-2",

    "disabled:var-color-daikinNeutral-200/color-base",
    "disabled:text-daikinNeutral-200",
    "disabled:placeholder:text-daikinNeutral-200",
  ],
  {
    variants: {
      error: {
        false: [
          "enabled:var-color-daikinNeutral-600/color-base",
          "focus-visible:var-color-daikinBlue-700/color-state-focus",
        ],
        true: ["enabled:var-color-daikinRed-500/color-base"],
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
      false: ["text-daikinNeutral-800"],
      true: ["text-daikinNeutral-200"],
    },
  },
});

/**
 * The text input component is a UI element that allows users to input single-line text data.
 * It functions similarly to the HTML `<input type="text">` tag, providing a simple and efficient way for users to enter and edit short pieces of texts, such as names, email addresses, or search queries.
 * Can be used within `daikin-input-group` component.
 *
 * Hierarchies:
 * - `daikin-text-input` (can be used solely)
 * - `daikin-input-group` > `daikin-text-input`
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input>` element.
 *
 * @slot left-icon - Specify the icon you want to use on the left. You can also use something other than `daikin-icon`.
 * @slot right-icon - Specify the icon you want to use on the right. You can also use something other than `daikin-icon`.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/text-input/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-input-group` component for complete example. -->
 * <daikin-text-input name="name"></daikin-text-input>
 * ```
 */
@customElement("daikin-text-input")
export class DaikinTextInput extends LitElement {
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
   * Type of the text input.
   */
  @property({ type: String })
  type: "text" | "email" | "tel" | "search" = "text";

  /**
   * Value of the text input.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Form name of the text input.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Placeholder text.
   */
  @property({ type: String })
  placeholder = "";

  /**
   * Whether the text input is readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the text input is disabled.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the text input is required.
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

  @state()
  private _hasLeftIcon = false;

  @state()
  private _hasRightIcon = false;

  private _handleSlotChange(event: Event, icon: "left" | "right") {
    const hasIcon = !!(event.target as HTMLSlotElement).assignedNodes().length;

    switch (icon) {
      case "left":
        this._hasLeftIcon = hasIcon;
        break;

      case "right":
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
        class=${cvaInput({ error: isError })}
        style=${`--input-padding-left:${this._hasLeftIcon ? "44px" : "16px"}; --input-padding-right:${this._hasRightIcon ? "44px" : "16px"};`}
        type=${this.type}
        value=${this.value}
        placeholder=${this.placeholder}
        name=${ifDefined(this.name)}
        maxlength=${ifDefined(this.maxlength)}
        autocomplete=${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
          ifDefined(this.autocomplete as any)
        }
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
        @input=${this._handleInput}
      />
      <div class=${cvaIcon({ icon: "left", disabled: this.disabled })}>
        <slot
          name="left-icon"
          @slotchange=${(event: Event) => this._handleSlotChange(event, "left")}
        ></slot>
      </div>
      <div class=${cvaIcon({ icon: "right", disabled: this.disabled })}>
        <slot
          name="right-icon"
          @slotchange=${(event: Event) =>
            this._handleSlotChange(event, "right")}
        ></slot>
      </div>`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._internals.setFormValue(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-input": DaikinTextInput;
  }
}
