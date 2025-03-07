import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaWrapper = cva(
  [
    "inline-block",
    "rounded-full",
    "relative",
    "overflow-hidden",
    "box-border",
    "size-full",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-ddt-color-common-border-focus",
  ],
  {
    variants: {
      type: {
        button: [
          "enabled:bg-ddt-color-common-neutral-default",
          "enabled:text-ddt-color-common-surface-default",

          "enabled:hover:bg-ddt-color-common-neutral-hover",
          "enabled:hover:text-ddt-color-common-surface-hover",
          "enabled:active:bg-ddt-color-common-neutral-press",
          "enabled:active:text-ddt-color-common-surface-press",
          "disabled:bg-ddt-color-common-disabled",
          "disabled:text-ddt-color-common-surface-default",
        ],
        icon: [
          "bg-ddt-color-common-neutral-default",
          "text-ddt-color-common-surface-default",
        ],
        link: [
          "link-enabled:bg-ddt-color-common-neutral-default",
          "link-enabled:text-ddt-color-common-surface-default",

          "link-enabled:hover:bg-ddt-color-common-neutral-hover",
          "link-enabled:hover:text-ddt-color-common-surface-hover",
          "link-enabled:active:bg-ddt-color-common-neutral-press",
          "link-enabled:active:text-ddt-color-common-surface-press",
          "link-disabled:bg-ddt-color-common-disabled",
          "link-disabled:text-ddt-color-common-surface-default",
        ],
      },
    },
  }
);

type AvatarVariantProps = MergeVariantProps<typeof cvaWrapper>;

/**
 * The avatar is a UI element that represent a user
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<button>` element. Suppressed if `disabled` is true,
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/avatar/index.js";
 * ```
 *
 * ```html
 * <daikin-avatar></daikin-avatar>
 * ```
 */
@customElement("daikin-avatar")
export class DaikinAvatar extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
      position: relative;
    }

    :host {
      padding: 0.25rem;
      width: 3rem;
      height: 3rem;
    }
  `;

  /**
   * Replace the wrapping element.
   */
  @property({ type: String, reflect: true })
  type: AvatarVariantProps["type"] = "icon";

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   * If omitted with `type="link"`, the link will be treated type [a placeholder link](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element:~:text=If%20the%20a%20element%20has%20no%20href%20attribute) and rendered type disabled state.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * Provides an accessible name of the avatar.
   */
  @property({ type: String, reflect: true })
  alt: string | null = null;

  /**
   * Specify the avatar disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query("a,button")
  private _focusableElement!: HTMLAnchorElement | HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled || (this.type === "link" && this.href == null)) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    const icon = html`
      <span
        class="i-daikin-profile transform-[translate(-50%, -50%)]"
      >
      </span>
    </daikin-icon>`;
    if (this.type === "icon") {
      return html`<span
        class=${cvaWrapper({ type: "icon" })}
        role="figure"
        aria-label=${ifDefined(this.alt ?? undefined)}
      >
        ${icon}
      </span>`;
    } else if (this.type === "button") {
      return html`<button
        class=${cvaWrapper({ type: "button" })}
        aria-label=${ifDefined(this.alt ?? undefined)}
        ?disabled=${this.disabled}
      >
        ${icon}
      </button>`;
    } else {
      const linkDisabled = this.disabled || this.href == null;
      return html`<a
        class=${cvaWrapper({ type: "link" })}
        role=${ifDefined(linkDisabled ? "link" : undefined)}
        aria-label=${ifDefined(this.alt ?? undefined)}
        href=${ifDefined(!linkDisabled ? (this.href ?? undefined) : undefined)}
        aria-disabled=${ifDefined(linkDisabled ? "true" : undefined)}
      >
        ${icon}
      </a>`;
    }
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
    "daikin-avatar": DaikinAvatar;
  }
}
