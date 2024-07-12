import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css?inline";

@customElement("daikin-breadcrumb")
export class DaikinBreadcrumb extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  private resizeObserver = new ResizeObserver(() => {
    this._omit();
  });

  // get link element from shadow root
  get _slottedLastLink() {
    const LastDaikinBreadCrumbItem = this._slottedLastDaikinBreadCrumbItem;
    if (!LastDaikinBreadCrumbItem) {
      return null;
    }
    return LastDaikinBreadCrumbItem.shadowRoot?.querySelector("a");
  }

  // get daikin-breadcrumb-item from shadow root
  get _slottedDaikinBreadCrumbItems() {
    const daikinBreadCrumbItems = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true });
    return daikinBreadCrumbItems;
  }

  get _slottedLastDaikinBreadCrumbItem() {
    const daikinBreadCrumbItems = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true });
    if (!daikinBreadCrumbItems) {
      return null;
    }
    return daikinBreadCrumbItems[daikinBreadCrumbItems.length - 1];
  }

  // get ol element from daikin-breadcrumb
  get _slottedOl() {
    const ol = this.shadowRoot?.querySelector("ol");
    return ol;
  }

  @property({ type: Boolean, reflect: true, attribute: "no-trailing-slash" })
  noTrailingSlash = false;

  @property({ type: Boolean, reflect: true })
  omission = false;

  private olOriginalWidth: number = 0;

  private ommisionMode: boolean = false;

  _omit() {
    // remove items and add omission if daikin-breadcrumb is to long
    const olWidth = this._slottedOl?.offsetWidth;
    const breadcrumbWidth = this.offsetWidth;
    const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
    if (
      olWidth &&
      olWidth >= breadcrumbWidth &&
      this.omission &&
      !this.ommisionMode
    ) {
      const omissionLink = document.createElement("daikin-breadcrumb-item");
      omissionLink.setAttribute("size", "min");

      daikinBreadCrumbItems?.forEach(
        (value: Element, index: number, array: Element[]) => {
          if (index === 0) {
            return;
          } else if (index === 1) {
            value.setAttribute("size", "min");
            return;
          } else if (index >= array.length - 2) {
            return;
          }
          value.setAttribute("hidden", "");
        }
      );
      this.ommisionMode = true;
    } else if (breadcrumbWidth > this.olOriginalWidth && this.ommisionMode) {
      daikinBreadCrumbItems?.forEach((value: Element) => {
        value.setAttribute("size", "max");
        value.removeAttribute("hidden");
      });
      this.ommisionMode = false;
    }
  }

  _handleLastItem() {
    // set last item to disabled
    const lastDaikinBreadCrumbItem = this._slottedLastDaikinBreadCrumbItem;
    if (!lastDaikinBreadCrumbItem) {
      return;
    }
    lastDaikinBreadCrumbItem.setAttribute("disabled", "");
    // remove last item slash if noTrailingSlash is true
    const link = this._slottedLastLink;
    if (!link) {
      return;
    }
    if (this.noTrailingSlash) {
      link.classList.add("after:content-none");
    } else {
      link.classList.remove("after:content-none");
    }
  }

  _handleChange() {
    this._handleLastItem();
  }

  override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("noTrailingSlash")) {
      this._handleLastItem();
    }
  }

  override firstUpdated(_changedProperties: PropertyValues<this>): void {
    this._handleLastItem();
    this._omit();

    if (this.omission) {
      this.resizeObserver.observe(this);
    }

    this.updateComplete.then(() => {
      const olElement = this._slottedOl;
      if (!olElement) {
        return;
      }
      this.olOriginalWidth = olElement?.offsetWidth;
    });
  }

  override render() {
    return html`
      <ol class="flex gap-2">
        <slot @slotchange=${this._handleChange}></slot>
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb": DaikinBreadcrumb;
  }
}
