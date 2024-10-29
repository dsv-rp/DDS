import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTextarea = cva(
  [
    "w-full",
    "h-full",
    "px-4",
    "py-3",
    "rounded-md",
    "font-daikinSerif",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",
    "placeholder:text-[#616161]",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-active,--color-state-focus,--color-base]/color-border",
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
      resize: {
        false: ["resize-none"],
        true: ["resize-vertical"],
      },
    },
  }
);

/**
 * The textarea component is designed for multiline text input, similar to the HTML `<textarea>` tag.
 * It is ideal for situations where users need to enter longer pieces of text, such as comments, descriptions, or messages.
 * Can be used within `daikin-input-group` component.
 *
 * Hierarchies:
 * - `daikin-textarea` (can be used solely)
 * - `daikin-input-group` > `daikin-textarea`
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<textarea>` element.
 * @fires input - A retargeted event of a [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/textarea/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-input-group` component for complete example. -->
 * <daikin-textarea name="name"></daikin-textarea>
 * ```
 */
@customElement("daikin-textarea")
export class DaikinTextarea extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      height: 87px;
      position: relative;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Value of the textarea.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Form name of the textarea.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Placeholder text.
   */
  @property({ type: String, reflect: true })
  placeholder = "";

  /**
   * Whether the textarea is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the textarea is readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the textarea is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Value of `autocomplete` attribute of the internal `<textarea>`.
   */
  @property({ type: String, reflect: true })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Whether to allow resizing of the text area.
   */
  @property({ type: Boolean, reflect: true })
  resizable = false;

  private _updateValue(value: string): void {
    this._internals.setFormValue(value);
  }

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._updateValue(this.value);

    this.dispatchEvent(
      new CustomEvent("change-count", {
        detail: {
          count: this.value.length,
        },
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  override render() {
    return html`<textarea
      class=${cvaTextarea({
        error: !this.disabled && this.error,
        resize: this.resizable,
      })}
      .value=${this.value}
      placeholder=${this.placeholder}
      name=${this.name}
      autocomplete=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.autocomplete as any)
      }
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      ?required=${this.required}
      @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
      @input=${this._handleInput}
      @keydown=${this._handleInput}
    ></textarea>`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._updateValue(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-textarea": DaikinTextarea;
  }
}
