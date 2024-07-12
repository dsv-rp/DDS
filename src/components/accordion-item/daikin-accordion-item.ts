import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaDetails = cva(
  [
    "flex",
    "w-full",
    "h-max",
    "bg-white",
    "font-daikinSerif",
    "overflow-clip",

    "[&>summary]:open:border-b",
    "[&>summary]:open:border-b-[#CECECE]",

    "[&>summary:hover]:[&[aria-disabled='false']]:bg-[#DCDCDC]",
    "[&>summary:hover]:[&[aria-disabled='false']]:cursor-pointer",
    "[&>summary:focus-visible]:[&[aria-disabled='false']]:outline",
    "[&>summary:focus-visible]:[&[aria-disabled='false']]:outline-[3px]",
    "[&>summary:focus-visible]:[&[aria-disabled='false']]:outline-[#0097E0]",
    "[&>summary:focus-visible]:[&[aria-disabled='false']]:outline-offset-[-3px]",

    "[&>summary:after]:[&[data-open]]:rotate-180",
  ],
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
    "px-[20px]",
    "outline-none",
    "relative",

    "after:block",
    "after:w-4",
    "after:h-4",
    "after:m-auto",
    "after:top-0",
    "after:right-4",
    "after:bottom-0",
    "after:absolute",
    "after:i-daikin-accordion-chevron-up",
    "after:transition-all",
    "after:rotate-0",
  ],
  {
    variants: {
      status: {
        enabled: ["after:text-[#828282]"],
        disabled: ["text-[#DCDCDC]", "after:text-[#DCDCDC]"],
      },
    },
  }
);

const animationOption = {
  duration: 1000,
  easing: "ease-in-out",
};

const contentCloseKeyframe = {
  height: 0,
};
const getContentOpenKeyframe = (content: HTMLElement) => ({
  height: `${content.offsetHeight}px`,
});

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-accordion-item")
export class DaikinAccordionItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      max-width: 400px;
    }
  `;

  contentRef: Ref<HTMLElement> = createRef();

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
   * The open attribute of the default details element does not allow the display of content to have a transition.
   * For this reason, it has its own `dataOpen` property and transfers the actual management of opening and closing to this property.
   */
  @state()
  dataOpen = false;

  private _handleSummaryClick(e: PointerEvent) {
    const content = this.contentRef.value;

    e.preventDefault();

    if (this.disabled || !content) {
      return;
    }

    if (this.dataOpen) {
      // Accordion is opened; close it.
      this.dataOpen = false;
      const animation = content.animate(
        [getContentOpenKeyframe(content), contentCloseKeyframe],
        animationOption
      );

      animation.onfinish = () => {
        // After the animation is finished, remove the open attribute from the details element. This is to allow the element to transition.
        this.open = this.dataOpen;
      };
    } else {
      // Accordion is closed; open it.
      this.dataOpen = true;
      this.open = this.dataOpen;
      content.animate(
        [contentCloseKeyframe, getContentOpenKeyframe(content)],
        animationOption
      );
    }
  }

  override render() {
    const accordionDetailsClassName = cvaDetails({
      status: this.disabled ? "disabled" : "enabled",
    });

    const accordionSummaryClassName = cvaSummary({
      status: this.disabled ? "disabled" : "enabled",
    });

    return html`<details
      class=${accordionDetailsClassName}
      ?open=${this.open}
      ?data-open=${this.dataOpen}
      aria-disabled=${this.disabled}
    >
      <summary
        class=${accordionSummaryClassName}
        @click=${this._handleSummaryClick}
        tabindex=${this.disabled ? -1 : 0}
      >
        ${this.title}
      </summary>
      <div ${ref(this.contentRef)}>
        <div class="pt-2 pb-[24px] px-[20px] text-sm">
          <slot></slot>
        </div>
      </div>
    </details>`;
  }

  override firstUpdated() {
    this.dataOpen = this.open;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion-item": DaikinAccordionItem;
  }
}

export default DaikinAccordionItem;
