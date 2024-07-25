import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
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
 * Primary UI component for user interaction
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

  private _handleSummaryClick(e: PointerEvent) {
    const content = this._contentRef.value;

    e.preventDefault();

    if (this.disabled || !content) {
      return;
    }

    if (this.open) {
      // Accordion is opened; close it.
      this.open = false;
      const animation = content.animate(
        [getContentOpenKeyframe(content), contentCloseKeyframe],
        animationOption
      );

      animation.onfinish = () => {
        // After the animation is finished, remove the open attribute from the details element. This is to allow the element to transition.
        this._detailsOpen = this.open;
      };
    } else {
      // Accordion is closed; open it.
      this.open = true;
      this._detailsOpen = this.open;
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

  protected override updated(): void {
    const sync = () => (this._detailsOpen = this.open);

    if (this.open) {
      sync();
    } else {
      setTimeout(() => sync(), 250);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion-item": DaikinAccordionItem;
  }
}

export default DaikinAccordionItem;
