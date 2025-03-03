import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaLoadingContainer = cva(["flex", "justify-center", "items-center"], {
  variants: {
    size: {
      small: ["size-8"],
      medium: ["size-14"],
    },
    variant: {
      fill: ["bg-ddt-color-common-background-default", "rounded"],
      ghost: ["bg-transparent"],
    },
  },
});

const cvaLoading = cva(
  [
    "block",
    "border-l-ddt-color-common-brand-default",
    "border-r-ddt-color-common-brand-default",
    "border-b-ddt-color-common-brand-default",
    "border-t-transparent",
    "rounded-full",
    "animate-[loading_800ms_ease_infinite]",
  ],
  {
    variants: {
      size: {
        small: ["size-[1.125rem]", "border-2"],
        medium: ["size-9", "border-4"],
      },
    },
  }
);

/**
 * The loading component is a component that can display a waiting animation. It can be used when communication is in progress.
 *
 * There are two variants available: one with a transparent background and one with a solid background. You can choose the one that is easier to see compared to the elements in the loading background.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/loading/index.js";
 * ```
 *
 * ```html
 *  <daikin-loading></daikin-loading>
 * ```
 */
@customElement("daikin-loading")
export class DaikinLoading extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: fit-content;
      height: fit-content;
    }
  `;

  /**
   * Size of the loading.
   */
  @property({ type: String, reflect: true })
  size: "small" | "medium" = "medium";

  /**
   * Variant of the loading.
   */
  @property({ type: String, reflect: true })
  variant: "fill" | "ghost" = "ghost";

  override render() {
    return html`<div
      class=${cvaLoadingContainer({ size: this.size, variant: this.variant })}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading"
    >
      <div class="size-fit rotate-45">
        <span class=${cvaLoading({ size: this.size })}></span>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-loading": DaikinLoading;
  }
}
