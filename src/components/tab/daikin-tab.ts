import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTab = cva(
  [
    "flex",
    "size-full",
    "items-center",
    "justify-center",
    "px-4",
    "pt-2",
    "pb-3",
    "leading-[130%]",
    "text-center",
    "font-daikinSerif",
    "tracking-wide",
    "relative",

    "focus-visible:outline-none",
    "focus-visible:before:absolute",
    "focus-visible:before:-inset-[3px]",
    "focus-visible:before:z-[1]",
    "focus-visible:before:border",
    "focus-visible:before:border-2",
    "focus-visible:before:border-ddt-color-common-border-focus",

    "disabled:text-ddt-color-common-disabled",

    "after:absolute",
    "after:inset-0",
    "after:top-auto",
  ],
  {
    variants: {
      active: {
        false: [
          "enabled:text-ddt-color-common-neutral-default",
          "enabled:hover:text-ddt-color-common-neutral-hover",
          "enabled:hover:bg-ddt-color-common-surface-hover",
          "enabled:active:text-ddt-color-common-neutral-press",
          "enabled:active:bg-ddt-color-common-surface-press",

          "after:h-[1px]",
          "after:bg-ddt-color-divider",
        ],
        true: [
          "font-bold",
          "enabled:text-ddt-color-common-brand-default",
          "enabled:hover:bg-ddt-color-common-surface-brand-hover",
          "enabled:active:bg-ddt-color-common-surface-brand-press",

          "after:h-1",

          "enabled:after:bg-ddt-color-common-brand-default",
          "disabled:after:bg-ddt-color-common-disabled",
        ],
      },
    },
  }
);

/**
 * The tab component is a child element within the `daikin-tabs` component, representing a clickable button or label that users interact with to switch between different panels of content.
 * Each tab corresponds to a specific panel and is typically labeled to indicate the content it reveals.
 *
 * Hierarchy:
 * - `daikin-tabs` > `daikin-tab`
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<button>` element. Suppressed if `disabled` is true,
 *
 * @slot - A slot for the tab button content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tab/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-tabs` component for complete example. -->
 * <daikin-tab value="foo">Foo tab</daikin-tab>
 * ```
 */
@customElement("daikin-tab")
export class DaikinTab extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      white-space: nowrap;
      min-width: fit-content;
      height: 2.5rem;
    }

    :host([sizing="stretch"]) {
      width: 100%;
    }
  `;

  /**
   * A unique string that identifies a tab.
   * Must be unique within the `daikin-tabs` component.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Whether the tab is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the tab width stretches or fits.
   * Controlled by `daikin-tabs`.
   */
  @property({ type: String, reflect: true })
  sizing: "stretch" | "fit" = "stretch";

  /**
   * Whether to show the active (selected) state.
   * Ignored if `disabled` is `true`.
   * Set automatically by `daikin-tabs` component.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  @query("button")
  private _button!: HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }

  override render() {
    return html`
      <button
        class=${cvaTab({ active: this.active })}
        ?disabled=${this.disabled}
        role="tab"
        aria-selected=${!this.disabled && this.active}
        tabindex=${this.active ? 0 : -1}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tab": DaikinTab;
  }
}
