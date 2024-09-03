import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import {
  LitElement,
  type PropertyValues,
  css,
  html,
  nothing,
  unsafeCSS,
} from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const cvaInput = cva(
  [
    "w-full",
    "h-full",
    "text-daikinNeutral-900",
    "border",
    "border-solid",
    "rounded-[6px]",
    "font-daikinSerif",
    "relative",
    "placeholder:text-daikinNeutral-700",

    "enabled:hover:outline",
    "enabled:hover:-outline-offset-2",
    "enabled:hover:outline-daikinNeutral-300",
    "enabled:hover:outline-2",

    "enabled:active:outline",
    "enabled:active:-outline-offset-2",
    "enabled:active:outline-daikinNeutral-300",
    "enabled:active:outline-2",

    "enabled:focus-visible:outline",
    "enabled:focus-visible:-outline-offset-2",
    "enabled:focus-visible:outline-daikinBlue-700",
    "enabled:focus-visible:outline-2",

    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:bg-[--text-input-background-color]",
    "disabled:border-[--text-input-outline-color-disabled]",
    "disabled:placeholder:text-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      error: {
        false: ["border-daikinNeutral-600"],
        true: ["border-[--text-input-border-color-error]"],
      },
      leftIcon: {
        false: ["pl-3"],
        true: ["pl-11"],
      },
      rightIcon: {
        false: ["pr-3"],
        true: ["pr-11"],
      },
    },
  }
);

const cvaIconContainer = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "w-6",
    "h-6",
    "absolute",
    "top-0",
    "bottom-0",
    "m-auto",
    "z-[1]",
  ],
  {
    variants: {
      disabled: {
        false: [],
        true: ["text-[--text-input-outline-color-disabled]"],
      },
      position: {
        left: ["left-3"],
        right: ["right-3"],
      },
    },
  }
);

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
 * @example
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
      --text-input-background-color: #ffffff;
      --text-input-border-color-error: ${unsafeCSS(colorFeedbackNegative)};
      --text-input-outline-color-disabled: #dcdcdc;
      --text-input-outline-color-active: #cecece;
      --text-input-outline-color-hover: #54c3f1;

      display: block;
      width: 340px;
      height: 48px;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Type of field
   */
  @property({ type: String })
  type: "text" | "email" | "tel" | "search" = "text";

  /**
   * Field value
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Name of the input field control used in the form
   */
  @property({ type: String, reflect: true })
  name?: string;

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = "";

  /**
   * Whether the field is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the field is readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Maximum length in field values
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Specify auto-completion values
   */
  @property({ type: String })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Set a icon in the left of label
   */
  @property({ type: String })
  leftIcon: IconType | null = null;

  /**
   * Set a icon in the right of label
   */
  @property({ type: String })
  rightIcon: IconType | null = null;

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  override render() {
    const createIcon = (position: "left" | "right", icon: IconType | null) =>
      icon
        ? html`<div
            class=${cvaIconContainer({
              disabled: this.disabled,
              position,
            })}
          >
            <daikin-icon icon=${icon} size="m" color="current"></daikin-icon>
          </div>`
        : nothing;

    return html`<div class="w-full h-full relative">
      ${createIcon("left", this.leftIcon)}
      <input
        class=${cvaInput({
          error: !this.disabled && this.error,
          leftIcon: !!this.leftIcon,
          rightIcon: !!this.rightIcon,
        })}
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
        @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
        @input=${this._handleInput}
      />
      ${createIcon("right", this.rightIcon)}
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
