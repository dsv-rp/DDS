import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaSummary = cva(
  [
    "flex",
    "justify-between",
    "items-center",
    "gap-2",
    "w-full",
    "min-h-12",
    "p-3",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-ddt-color-common-border-focus",

    "after:size-6",
    "after:transition-all",
    "after:i-daikin-chevron-down",
  ],
  {
    variants: {
      open: {
        false: ["after:rotate-0"],
        true: ["after:rotate-180"],
      },
      disabled: {
        false: [
          "cursor-pointer",
          "hover:bg-ddt-color-common-surface-hover",
          "active:bg-ddt-color-common-surface-press",
        ],
        true: [
          "text-ddt-color-common-disabled",
          "after:text-ddt-color-common-disabled",
        ],
      },
    },
  }
);

const cvaContent = cva(["grid", "duration-[250ms]", "ease-in-out"], {
  variants: {
    open: {
      false: ["grid-rows-[0fr]"],
      true: ["grid-rows-[1fr]"],
    },
  },
});

/**
 * The accordion item component is a child element within the `daikin-accordion` component.
 * It functions similarly to the HTML `<details>` and `<summary>` tag, allowing users to expand or collapse the associated content by clicking on the header.
 * This component is responsible for displaying the specific content within the accordion and allowing users to interact with each section independently.
 *
 * Hierarchy:
 * - `daikin-accordion` > `daikin-accordion-item`
 *
 * @fires toggle - Fires when the summary is clicked. Used by `daikin-accordion`.
 *
 * @slot - A slot for the accordion item content.
 * @slot summary - A slot for the accordion item summary content.
 *
 * @cssprop [--divider-top-display=none] - The `display` property of the top divider. Must be either `block` or `none`. Set automatically by `daikin-accordion` component.
 * @cssprop [--divider-bottom-display=none] - The `display` property of the bottom divider. Must be either `block` or `none`. Set automatically by `daikin-accordion` component.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/accordion-item/index.js";
 * ```
 *
 * ```html
 * <daikin-accordion-item>
 *   <span slot="Accordion summary">
 *   Accordion content
 * </daikin-accordion-item>
 * ```
 */
@customElement("daikin-accordion-item")
export class DaikinAccordionItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      position: relative;

      --divider-top-display: none;
      --divider-bottom-display: none;
    }

    :host::before {
      content: "";
      display: var(--divider-top-display, none);
      width: 100%;
      height: 1px;
      background: var(--dds-color-divider);
    }

    :host::after {
      content: "";
      display: var(--divider-bottom-display, none);
      width: 100%;
      height: 1px;
      background: var(--dds-color-divider);
    }
  `;

  private _summaryRef = createRef<HTMLElement>();

  private _contentRef = createRef<HTMLElement>();

  /**
   * A unique name for the accordion item within the accordion.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Whether the accordion item is open.
   * Ignored if `disabled` is `true`.
   * Controlled by `daikin-accordion`.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether the accordion item is disabled.
   * If this is set to `true`, the accordion item will always be closed.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleSummaryClick(event: PointerEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(new Event("toggle", event));
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const direction = (
      {
        ArrowDown: "down",
        ArrowUp: "up",
      } as const
    )[event.key];

    if (!direction) {
      return;
    }

    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent("accordion-move-focus", {
        detail: {
          direction,
        },
        bubbles: true,
      })
    );
  }

  override render() {
    const open = !this.disabled && this.open;

    return html`<div
      class="w-full text-ddt-color-common-text-primary font-daikinSerif overflow-clip"
    >
      <button
        id="summary"
        ${ref(this._summaryRef)}
        class=${cvaSummary({
          open,
          disabled: this.disabled,
        })}
        ?disabled=${this.disabled}
        aria-expanded=${open}
        aria-controls="content"
        tabindex=${this.disabled ? -1 : 0}
        @click=${this._handleSummaryClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="summary"></slot>
      </button>
      <div
        ${ref(this._contentRef)}
        id="content"
        role="region"
        class=${cvaContent({ open })}
        aria-labelledby="summary"
        ?hidden=${!open}
      >
        <div class="overflow-hidden">
          <div class="pt-2 px-3 pb-3">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>`;
  }

  /**
   * Focuses on the inner summary.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._summaryRef.value?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion-item": DaikinAccordionItem;
  }
}

export default DaikinAccordionItem;
