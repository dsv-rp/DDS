import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaButton = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "size-full",
    "font-daikinSerif",
    "font-bold",
    "rounded",
    "px-3",
    "tracking-wide",
    "text-nowrap",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-ddt-color-common-border-focus",

    "var-color-transparent/color-secondary",
    "link-disabled:var-color-ddt-color-common-disabled/color-primary",
  ],
  {
    variants: {
      color: {
        default: [
          "link-enabled:var-color-ddt-color-common-brand-default/color-primary",
          "link-enabled:hover:var-color-ddt-color-common-brand-hover/color-primary",
          "link-enabled:hover:var-color-ddt-color-common-surface-brand-hover/color-secondary",
          "link-enabled:active:var-color-ddt-color-common-brand-press/color-primary",
          "link-enabled:active:var-color-ddt-color-common-surface-brand-press/color-secondary",
        ],
        danger: [
          "link-enabled:var-color-ddt-color-common-danger-default/color-primary",
          "link-enabled:hover:var-color-ddt-color-common-danger-hover/color-primary",
          "link-enabled:hover:var-color-ddt-color-common-surface-danger-hover/color-secondary",
          "link-enabled:active:var-color-ddt-color-common-danger-press/color-primary",
          "link-enabled:active:var-color-ddt-color-common-surface-danger-press/color-secondary",
        ],
      },
      variant: {
        fill: ["text-ddt-color-common-text-inverse", "bg-[--color-primary]"],
        outline: [
          "border",
          "text-[--color-primary]",
          "bg-[--color-secondary]",
          "border-[--color-primary]",
        ],
        ghost: ["text-[--color-primary]", "bg-[--color-secondary]"],
      },
      size: {
        small: ["text-sm"],
        medium: ["text-sm"],
      },
    },
  }
);

type ButtonVariantProps = MergeVariantProps<typeof cvaButton>;

/**
 * The button component is a versatile UI element that triggers actions or submits forms when clicked.
 * It functions similarly to the HTML `<button>` tag, allowing users to initiate various operations such as submitting data, opening dialogs, or navigating to different sections of an application.
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<a>` or `<button>` element. Suppressed if `disabled` is true,
 *
 * @slot - A slot for the button content.
 * @slot left-icon - A slot for an icon to be placed to the left of the text. Place `daikin-icon` or something similar.
 * @slot right-icon - A slot for an icon to be placed to the right of the text. Place `daikin-icon` or something similar.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/button/index.js";
 * ```
 *
 * ```html
 * <daikin-button>
 *   Button label
 * </daikin-button>
 * ```
 */
@customElement("daikin-button")
export class DaikinButton extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }

    :host([size="small"]) {
      min-width: 3.25em;
      height: 2rem;
    }

    :host([size="medium"]) {
      min-width: 3.75em;
      height: 3rem;
    }
  `;

  /**
   * Variant of the button.
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariantProps["variant"] = "fill";

  /**
   * Size of the button.
   */
  @property({ type: String, reflect: true })
  size: "small" | "medium" = "medium";

  /**
   * Color of the button.
   */
  @property({ type: String, reflect: true })
  color: ButtonVariantProps["color"] = "default";

  /**
   * Specify the button disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   * If omitted with `type="link"`, the link will be treated as [a placeholder link](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element:~:text=If%20the%20a%20element%20has%20no%20href%20attribute) and rendered as disabled state.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * Type of the button.
   * If `"link"` is specified, the button will be rendered as an `<a>` element.
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" | "link" = "button";

  /**
   * Optional ARIA role of the button.
   */
  @property({ type: String, reflect: true, attribute: "button-role" })
  buttonRole: ARIARole | null = null;

  @query("a,button")
  private _focusableElement!: HTMLAnchorElement | HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    const className = cvaButton({
      variant: this.variant,
      color: this.color,
      size: this.size,
    });

    if (this.type === "link") {
      const linkDisabled = this.disabled || this.href == null;
      return html`<a
        class=${className}
        href=${ifDefined(!linkDisabled ? (this.href ?? undefined) : undefined)}
        role=${ifDefined(
          this.buttonRole ?? (linkDisabled ? "link" : undefined)
        )}
        aria-disabled=${ifDefined(linkDisabled ? "true" : undefined)}
      >
        <slot name="left-icon" class="icon-size-6">
          <span class="block -ml-1"></span>
        </slot>
        <span class="px-2"><slot></slot></span>
        <slot name="right-icon" class="icon-size-6">
          <span class="block -mr-1"></span>
        </slot>
      </a>`;
    }

    return html`
      <button
        class=${className}
        ?disabled=${this.disabled}
        type=${this.type}
        role=${ifDefined(this.buttonRole ?? undefined)}
      >
        <slot name="left-icon" class="icon-size-6">
          <span class="block -ml-1"></span>
        </slot>
        <span class="px-2"><slot></slot></span>
        <slot name="right-icon" class="icon-size-6">
          <span class="block -mr-1"></span>
        </slot>
      </button>
    `;
  }

  /**
   * Focuses on the inner button or link.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._focusableElement?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-button": DaikinButton;
  }
}
