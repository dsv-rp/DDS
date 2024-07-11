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
    this._omitt();
  });

  // get link element from shadow root
  get _slottedLastLink() {
    const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
    if (!daikinBreadCrumbItems) {
      return;
    }
    const item = daikinBreadCrumbItems[daikinBreadCrumbItems.length - 1];
    if (!item) {
      return;
    }
    return item.shadowRoot?.querySelector("a");
  }

  // get daikin-breadcrumb-item from shadow root
  get _slottedDaikinBreadCrumbItems() {
    const daikinBreadCrumbItems = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true });
    return daikinBreadCrumbItems;
  }

  get _slottedOl() {
    const ol = this.shadowRoot?.querySelector("ol");
    return ol;
  }

  @property({ type: Boolean, reflect: true, attribute: "no-trailing-slash" })
  noTrailingSlash = false;

  @property({ type: Boolean, reflect: true })
  omission = true;

  private originalItems: Element[] = [];

  private olOriginalWidth: number = 0;

  _omitt() {
    // remove items and add omission if daikin-breadcrumb is to long
    const olWidth = this._slottedOl?.offsetWidth;
    const breadcrumbWidth = this.offsetWidth;
    const olElement = this._slottedOl;
    const slot = olElement?.querySelector("slot");
    if (olWidth && olWidth >= breadcrumbWidth && this.omission) {
      const omissionLink = document.createElement("daikin-breadcrumb-item");
      omissionLink.setAttribute("size", "min");

      const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
      const tempArray: Element[] = [];
      daikinBreadCrumbItems?.forEach(
        (value: Element, index: number, array: Element[]) => {
          if (index === 0) {
            tempArray.push(value);
            tempArray.push(omissionLink);
          } else if (index >= array.length - 2) {
            tempArray.push(value);
          }
          value.remove();
        }
      );
      slot?.append(...tempArray);
    } else if (breadcrumbWidth > this.olOriginalWidth) {
      const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
      daikinBreadCrumbItems?.forEach((value: Element) => {
        value.remove();
      });
      slot?.append(...this.originalItems);
    }
  }

  _removeLastSlash() {
    // remove last item slash if noTrailingSlash is true
    const link = this._slottedLastLink as HTMLLinkElement | null;
    if (link && this.noTrailingSlash) {
      link.classList.add("after:content-none");
    }
  }

  _handleChange() {
    this._removeLastSlash();
  }

  override firstUpdated(_changedProperties: PropertyValues<this>): void {
    const breadCrumbItems = this._slottedDaikinBreadCrumbItems;
    if (breadCrumbItems) {
      breadCrumbItems.forEach((breadCrumbItem) => {
        this.originalItems.push(breadCrumbItem);
      });
    }
    this._removeLastSlash();
    this._omitt();

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
