import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
      disabled: {
        enabled: [],
        disabled: ["text-[#DCDCDC]"],
      },
    },
    defaultVariants: {
      disabled: "enabled",
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
    "after:i-daikin-accordion-chevron",
    "after:transition-all",
    "after:rotate-0",
  ],
  {
    variants: {
      disabled: {
        enabled: ["after:text-[#828282]"],
        disabled: ["text-[#DCDCDC]", "after:text-[#DCDCDC]"],
      },
    },
    defaultVariants: {
      disabled: "enabled",
    },
  }
);

const cvaContent = cva(["pt-2", "pb-[24px]", "px-[20px]", "text-sm"]);

const animationOptionBase = {
  duration: 1000,
  easing: "ease-in-out",
};

const contentDefault = {
  height: 0,
};
const contentVisible = (content: HTMLElement) => [
  {
    height: `${content.offsetHeight}px`,
  },
];

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-accordion-item")
export class DaikinAccordionItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --accordion-summary-chevron-rotate: 0;
      display: block;
      width: 100%;
      max-width: 400px;
    }
  `;

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

  @state()
  dataOpen = false;

  private _visibleContents(e: PointerEvent) {
    const content = (e.target as HTMLElement).nextElementSibling as HTMLElement;
    e.preventDefault();

    if (this.disabled) {
      return;
    }

    if (this.dataOpen) {
      this.dataOpen = false;
      const animation = content.animate(
        [...contentVisible(content), contentDefault],
        animationOptionBase
      );

      animation.onfinish = () => {
        this.open = this.dataOpen;
      };
    } else {
      this.dataOpen = true;
      this.open = this.dataOpen;
      content.animate(
        [contentDefault, ...contentVisible(content)],
        animationOptionBase
      );
    }
  }

  override render() {
    const accordionDetailsClassName = cvaDetails({
      disabled: this.disabled ? "disabled" : "enabled",
    });

    const accordionSummaryClassName = cvaSummary({
      disabled: this.disabled ? "disabled" : "enabled",
    });

    const accordionContentClassName = cvaContent();

    return html`<details
      class=${accordionDetailsClassName}
      ?open=${this.open}
      ?data-open=${this.dataOpen}
      aria-disabled=${this.disabled}
    >
      <summary
        class=${accordionSummaryClassName}
        @click=${this._visibleContents}
        tabindex=${this.disabled ? -1 : 0}
      >
        ${this.title}
      </summary>
      <div>
        <div class=${accordionContentClassName}>
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
