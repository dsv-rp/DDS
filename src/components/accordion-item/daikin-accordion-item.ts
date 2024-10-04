import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaDetails = cva(
  ["flex", "w-full", "h-max", "bg-white", "font-daikinSerif", "overflow-clip"],
  {
    variants: {
      status: {
        enabled: [],
        disabled: ["text-[#DCDCDC]"],
      },
    },
  }
);

const cvaSummary = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "h-12",
    "px-5",
    "outline-none",
    "relative",

    "after:block",
    "after:w-5",
    "after:h-5",
    "after:m-auto",
    "after:top-0",
    "after:right-4",
    "after:bottom-0",
    "after:absolute",
    "after:i-daikin-accordion-chevron-up",
    "after:transition-all",
  ],
  {
    variants: {
      visible: {
        open: ["after:rotate-0"],
        close: ["after:-rotate-180"],
      },
      status: {
        enabled: [
          "hover:bg-[#DCDCDC]",
          "hover:bg-[#DCDCDC]",
          "hover:cursor-pointer",
          "focus-visible:outline",
          "focus-visible:outline-[2px]",
          "focus-visible:outline-[#0097E0]",
          "focus-visible:outline-offset-[-2px]",

          "after:text-[#828282]",
        ],
        disabled: ["text-[#DCDCDC]", "after:text-[#DCDCDC]"],
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
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/accordion-item/index.js";
 * ```
 *
 * ```html
 * <daikin-accordion-item title="The first accordion item">
 *   Accordion 1 content.
 * </daikin-accordion-item>
 * ```
 */
@customElement("daikin-accordion-item")
export class DaikinAccordionItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  private _contentRef = createRef<HTMLElement>();

  /**
   * Heading of accordion
   */
  @property({ type: String })
  override title = "";

  /**
   * Whether the accordion is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether the accordion is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Open attribute of the actual details element
   *
   * The default `open` attribute of the default details element does not allow the display of content to have transitions.
   * To solve this, the `open` property that `daikin-accordion-item` receives manages the opening and closing of items independently of the open attribute.
   *
   * The `open` attribute, which should be present, is taken over by `_detailsOpen`.
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

  private _handleSummaryClick(e: PointerEvent) {
    e.preventDefault();
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
  }

  override render() {
    const accordionDetailsClassName = cvaDetails({
      status: this.disabled ? "disabled" : "enabled",
    });

    const accordionSummaryClassName = cvaSummary({
      status: this.disabled ? "disabled" : "enabled",
      visible: this.open ? "open" : "close",
    });

    return html`<details
      class=${accordionDetailsClassName}
      ?open=${this._detailsOpen}
      ?data-open=${this.open}
      aria-disabled=${this.disabled}
    >
      <summary
        class=${accordionSummaryClassName}
        tabindex=${this.disabled ? -1 : 0}
        @click=${this._handleSummaryClick}
      >
        ${this.title}
      </summary>
      <div ${ref(this._contentRef)}>
        <div class="pt-2 pb-6 px-5 text-sm">
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
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion-item": DaikinAccordionItem;
  }
}

export default DaikinAccordionItem;
