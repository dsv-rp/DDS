import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaLoadingContainer = cva(
  ["flex", "justify-center", "items-center", "size-full"],
  {
    variants: {
      background: {
        false: ["bg-transparent"],
        true: ["bg-ddt-color-common-background-default", "rounded"],
      },
    },
  }
);

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
 * The loading component displays a spinner to indicate that a process is in progress.
 * If the spinner is expected to blend into the background, set the background color. You can use the `background` attribute for such cases.
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
    }

    :host([size="small"]) {
      width: 2rem;
      height: 2rem;
    }

    :host([size="medium"]) {
      width: 3.5rem;
      height: 3.5rem;
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
  @property({ type: Boolean, reflect: true })
  background = false;

  override render() {
    return html`<div
      class=${cvaLoadingContainer({ background: this.background })}
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
