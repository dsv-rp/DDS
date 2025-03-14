import { cva } from "class-variance-authority";
import { type PropertyValues, css, html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinInputGroup } from "../input-group";

const cvaTextArea = cva(
  [
    "w-full",
    "h-full",
    "bg-ddt-color-common-background-default",
    "px-4",
    "py-3",
    "rounded",
    "font-daikinSerif",
    "outline",
    "outline-[--color-border]",
    "outline-1",
    "-outline-offset-1",
    "placeholder:text-ddt-color-common-text-secondary",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-active,--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",

    "enabled:text-ddt-color-common-text-primary",
    "enabled:hover:bg-ddt-color-common-surface-hover",
    "enabled:active:bg-ddt-color-common-surface-press",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "disabled:var-color-ddt-color-common-disabled/color-base",
    "disabled:text-ddt-color-common-disabled",
    "disabled:bg-color-common-background-default",
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
      resize: {
        false: ["resize-none"],
        true: ["resize-vertical"],
      },
    },
  }
);

/**
 * The text area component is designed for multiline text input, similar to the HTML `<textarea>` tag.
 * It is ideal for situations where users need to enter longer pieces of text, such as comments, descriptions, or messages.
 * Can be used within `daikin-input-group` component.
 *
 * Hierarchies:
 * - `daikin-text-area` (can be used solely)
 * - `daikin-input-group` > `daikin-text-area`
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<textarea>` element.
 * @fires input - A retargeted event of a [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/text-area/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-input-group` component for complete example. -->
 * <daikin-text-area name="name"></daikin-text-area>
 * ```
 */
@ddsElement("daikin-text-area")
export class DaikinTextArea extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      height: 5.5rem;
      position: relative;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

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
  @property({ type: String, reflect: true })
  placeholder: string | null = null;

  /**
   * Whether the text area is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the text area is readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the text area is required.
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

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  get count(): number {
    return this.value.length;
  }

  private _updateValue(value: string): void {
    this._internals.setFormValue(value);
  }

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._updateValue(this.value);
  }

  override render() {
    return html`<textarea
      class=${cvaTextArea({
        error: !this.disabled && this.error,
        resize: this.resizable,
      })}
      placeholder=${ifDefined(this.placeholder ?? undefined)}
      name=${this.name}
      autocomplete=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.autocomplete as any)
      }
      aria-label=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this._label as any)
      }
      .value=${this.value}
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

  /**
   * This method is used by `daikin-input-group` to reflect it's attributes to this component.
   * @private
   */
  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    const isError =
      !inputGroup.disabled &&
      (!!inputGroup.error || !!inputGroup.textareaLimitExceeded);
    this.disabled = !!inputGroup.disabled;
    this.required = !!inputGroup.required;
    this.error = isError;
    this._label = inputGroup.label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-area": DaikinTextArea;
  }
}
