import { cva } from "class-variance-authority";
import { type PropertyValues, css, html, nothing, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon-button/daikin-icon-button";
import type { DaikinInputGroup } from "../input-group";

const cvaInput = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "h-full",
    "bg-ddt-color-common-background-default",
    "relative",
    "px-2",
    "rounded",
    "overflow-hidden",
    "font-daikinSerif",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",
    "placeholder:text-ddt-color-common-text-secondary",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "enabled:text-ddt-color-common-text-primary",
    "enabled:hover:bg-ddt-color-common-surface-hover",
    "enabled:active:bg-ddt-color-common-surface-press",
    "focus-visible:outline-2",

    "disabled:var-color-ddt-color-common-disabled/color-base",
    "disabled:text-ddt-color-common-disabled",
    "disabled:bg-ddt-color-common-background-default",
    "disabled:placeholder:text-ddt-color-common-disabled",
  ],
  {
    variants: {
      error: {
        false: [
          "enabled:var-color-ddt-color-common-neutral-default/color-base",
          "enabled:hover:var-color-ddt-color-common-neutral-hover/color-base",
          "enabled:active:var-color-ddt-color-common-neutral-press/color-base",
          "focus-visible:var-color-ddt-color-common-border-focus/color-state-focus",
        ],
        true: ["enabled:var-color-ddt-color-common-danger-default/color-base"],
      },
      leftIcon: {
        false: ["pl-4"],
        true: ["pl-11"],
      },
      rightIcon: {
        false: ["pr-4"],
        true: ["pr-11"],
      },
      type: {
        text: [],
        password: [],
        email: [],
        tel: [],
        search: ["[&::-webkit-search-cancel-button]:appearance-none"],
      },
    },
  }
);

const cvaIcon = cva(
  ["flex", "items-center", "absolute", "pointer-events-none"],
  {
    variants: {
      icon: {
        left: ["left-3"],
        right: ["right-3"],
      },
      disabled: {
        false: ["text-ddt-color-common-text-primary"],
        true: ["text-ddt-color-common-disabled"],
      },
      type: {
        text: [],
        email: [],
        tel: [],
        search: ["i-daikin-search", "size-6"],
      },
    },
  }
);

const cvaShowPasswordIcon = cva(["icon-size-6"], {
  variants: {
    showPassword: {
      false: ["i-daikin-password-visible"],
      true: ["i-daikin-password-hidden"],
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
 * @fires search - When `type="search"`, it emits when the enter key is pressed.
 * @fires show - When `type="password"`, it emits depending on whether the password is displayed or not.
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
@ddsElement("daikin-text-field")
export class DaikinTextField extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
      height: 3rem;
      position: relative;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Type of field.
   */
  @property({ type: String })
  type: "text" | "password" | "email" | "tel" | "search" = "text";

  /**
   * The current value of the input, submitted as a name/value pair with form data.
   */
  @property({ type: String })
  value = "";

  /**
   * The name of the input, submitted as a name/value pair with form data.
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
   * Minimum length of value.
   */
  @property({ type: Number, reflect: true })
  minlength: number | null = null;

  /**
   * Maximum length of value.
   */
  @property({ type: Number, reflect: true })
  maxlength: number | null = null;

  /**
   * The pattern of value.
   */
  @property({ type: String, reflect: true })
  pattern: string | null = null;

  /**
   * Value of `autocomplete` attribute of the internal `<input>`.
   */
  @property({ type: String, reflect: true })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * When `type="password"`, whether to display the password with a black dot or as text.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-password" })
  showPassword = false;

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  @state()
  private _hasLeftIcon = false;

  @state()
  private _hasRightIcon = false;

  private _handleSlotChange(event: Event) {
    if (["password", "search"].includes(this.type)) {
      //The password and search variants do not allow slot icons.
      return;
    }

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

  private _handleInput(event: InputEvent): void {
    this.value = (event.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  private _handleClearClick(): void {
    this.value = "";
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (this.type === "search" && event.key === "Enter") {
      this.dispatchEvent(new Event("search"));
    }
  }

  private _handleShowPasswordClick(): void {
    this.showPassword = !this.showPassword;
    this.dispatchEvent(new Event("show"));
  }

  override render() {
    const isError = !this.disabled && this.error;
    const type =
      this.type === "password" && this.showPassword ? "text" : this.type;

    const createIcon = (() => {
      switch (this.type) {
        case "password":
          return html`<daikin-icon-button
            color="neutral"
            variant="ghost"
            ?disabled=${this.disabled}
            button-aria-label=${this.showPassword
              ? "Hidden password"
              : "Show password"}
            class="absolute right-3"
            @click=${this._handleShowPasswordClick}
          >
            <span
              class=${cvaShowPasswordIcon({ showPassword: this.showPassword })}
            ></span>
          </daikin-icon-button>`;

        case "search":
          return html`<span
              class=${cvaIcon({
                icon: "left",
                disabled: this.disabled,
                type: this.type,
              })}
            ></span>
            ${!!this.value && !!this.value.length
              ? html`<daikin-icon-button
                  color="neutral"
                  variant="ghost"
                  ?disabled=${this.disabled}
                  button-aria-label="Clear"
                  class="absolute right-3 size-6"
                  @click=${this._handleClearClick}
                >
                  <span class="i-daikin-close"></span>
                </daikin-icon-button>`
              : nothing}`;

        default:
          return html`<div
              class=${cvaIcon({
                icon: "left",
                disabled: this.disabled,
                type: this.type,
              })}
            >
              <slot
                name="left-icon"
                class="icon-size-6"
                @slotchange=${this._handleSlotChange}
              ></slot>
            </div>
            <div
              class=${cvaIcon({
                icon: "right",
                disabled: this.disabled,
                type: this.type,
              })}
            >
              <slot
                name="right-icon"
                class="icon-size-6"
                @slotchange=${this._handleSlotChange}
              ></slot>
            </div>`;
      }
    })();

    return html`<input
        class=${cvaInput({
          error: isError,
          leftIcon: this._hasLeftIcon,
          rightIcon: this._hasRightIcon,
          type: this.type,
        })}
        type=${type}
        placeholder=${ifDefined(this.placeholder ?? undefined)}
        name=${ifDefined(this.name)}
        minlength=${ifDefined(this.minlength ?? undefined)}
        maxlength=${ifDefined(this.maxlength ?? undefined)}
        pattern=${ifDefined(this.pattern ?? undefined)}
        autocomplete=${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
          ifDefined(this.autocomplete as any)
        }
        aria-label=${ifDefined(this._label ?? undefined)}
        .value=${this.value}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
        @input=${this._handleInput}
        @keydown=${this._handleKeyDown}
      />
      ${createIcon}`;
  }

  protected override firstUpdated(): void {
    switch (this.type) {
      case "password":
        this._hasRightIcon = true;
        return;

      case "search":
        this._hasRightIcon = true;
        this._hasLeftIcon = true;
        return;

      default:
        return;
    }
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._internals.setFormValue(this.value);
  }

  /**
   * This method is used by `daikin-input-group` to reflect it's attributes to this component.
   * @private
   */
  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    const isError = !inputGroup.disabled && !!inputGroup.error;
    this.disabled = !!inputGroup.disabled;
    this.required = !!inputGroup.required;
    this.error = isError;
    this._label = inputGroup.label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-field": DaikinTextField;
  }
}
