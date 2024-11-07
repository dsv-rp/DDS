import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinInputGroup } from "../input-group";

const cvaTextArea = cva(
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
    "placeholder:text-system-element-text-secondary",

    // Define `--color-border` as a CSS variable that references `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-active,--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "enabled:text-system-element-text-primary",
    "enabled:hover:bg-system-background-surface-hover",
    "enabled:active:bg-system-background-surface-press",
    "focus-visible:outline-2",

    "disabled:var-color-system-state-disabled/color-base",
    "disabled:text-system-state-disabled",
    "disabled:bg-white",
    "disabled:placeholder:text-system-state-disabled",
  ],
  {
    variants: {
      error: {
        false: [
          "enabled:var-color-system-state-neutral-hover/color-base",
          "focus-visible:var-color-system-state-focus/color-state-focus",
        ],
        true: ["enabled:var-color-system-state-error-active/color-base"],
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
@customElement("daikin-text-area")
export class DaikinTextArea extends LitElement {
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
   * Value of the text area.
   */
  @property({ type: String })
  value = "";

  /**
   * Form name of the text area.
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
      .value=${this.value}
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
    "daikin-text-area": DaikinTextArea;
  }
}
