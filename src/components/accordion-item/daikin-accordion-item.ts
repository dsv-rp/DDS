import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
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
    "focus-visible:outline-system-state-focus",

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
          "hover:bg-system-background-surface-hover",
          "active:bg-system-background-surface-press",
        ],
        true: [
          "text-system-state-disabled",
          "after:text-system-state-disabled",
        ],
      },
    },
  }
);

const animationOption = {
  duration: 250,
  easing: "ease-in-out",
};

const contentCloseKeyframe = {
  height: 0,
};
const getContentOpenKeyframe = (content: HTMLElement) => ({
  height: `${content.offsetHeight}px`,
});

/**
 * The accordion item component is a child element within the `daikin-accordion` component.
 * It functions similarly to the HTML `<details>` and `<summary>` tag, allowing users to expand or collapse the associated content by clicking on the header.
 * This component is responsible for displaying the specific content within the accordion and allowing users to interact with each section independently.
 *
 * Hierarchy:
 * - `daikin-accordion` > `daikin-accordion-item`
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
      background: #828282; /* system-element-divider-primary */
      position: absolute;
      top: 0;
    }

    :host::after {
      content: "";
      display: var(--divider-bottom-display, none);
      width: 100%;
      height: 1px;
      background: #828282; /* system-element-divider-primary */
      position: absolute;
      bottom: 0;
    }
  `;

  private _contentRef = createRef<HTMLElement>();

  /**
   * Whether the accordion item is open.
   * Ignored if `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether the accordion item is disabled.
   * If this is set to `true`, the accordion item will always be closed.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query("summary")
  private _summary!: HTMLElement | null;

  /**
   * Actual presence of `open` attribute of the `<details>` element.
   *
   * The `<details>` element does not support animation on changing the `open` attribute.
   * In other words, the content is hidden immediately when the `open` attribute is removed.
   * To enable animation for an accordion, we need to run the animation while maintaining the `open` attribute, and then remove the `open` attribute at the end of the animation.
   * Treated as `false` if `disabled` is `true`.
   */
  @state()
  private _detailsOpen = false;

  private _contentAnimate() {
    const content = this._contentRef.value;
    if (!content || this.open === this._detailsOpen) {
      return;
    }

    if (this.open) {
      // Accordion is closed; open it.
      this._detailsOpen = this.open;
      content.animate(
        [contentCloseKeyframe, getContentOpenKeyframe(content)],
        animationOption
      );
    } else {
      // Accordion is opened; close it.
      const animation = content.animate(
        [getContentOpenKeyframe(content), contentCloseKeyframe],
        animationOption
      );

      animation.onfinish = () => {
        // After the animation is finished, remove the open attribute from the details element. This is to allow the element to transition.
        this._detailsOpen = this.open;
      };
    }
  }

  private _handleSummaryClick(event: PointerEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
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

  // When using the in-page search, the `<details>` element may open without clicking on the `<summary>`.
  // In order to handle such cases, it is necessary to respond to the "toggle" event.
  private _handleToggle(event: ToggleEvent) {
    event.preventDefault();
    if (this.disabled) {
      // Prevent the accordion item from opening with in-page searches when disabled.
      return;
    }

    this.open = event.newState === "open";
  }

  override render() {
    const detailsOpen = !this.disabled && this._detailsOpen;
    const open = !this.disabled && this.open;

    return html`<details
      class="flex w-full text-system-element-text-primary font-daikinSerif overflow-clip"
      ?open=${detailsOpen}
      ?data-open=${open}
      aria-disabled=${this.disabled}
      @toggle=${this._handleToggle}
    >
      <summary
        id="summary"
        class=${cvaSummary({
          open,
          disabled: this.disabled,
        })}
        tabindex=${this.disabled ? -1 : 0}
        @click=${this._handleSummaryClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="summary"></slot>
      </summary>
      <div
        ${ref(this._contentRef)}
        role="region"
        aria-labelledby="summary"
        ?hidden=${this.disabled}
      >
        <div class="pt-2 px-3 pb-3">
          <slot></slot>
        </div>
      </div>
    </details>`;
  }

  protected override firstUpdated(): void {
    this._detailsOpen = this.open;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open")) {
      this._contentAnimate();
    }
  }

  /**
   * Focuses on the inner summary.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._summary?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion-item": DaikinAccordionItem;
  }
}

export default DaikinAccordionItem;
