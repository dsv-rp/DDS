import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import { cvaTreeChildren, type DaikinTreeItem } from "../tree-item";

const cvaIconContainer = cva(
  ["size-6", "i-daikin-chevron-right", "transition-all"],
  {
    variants: { open: { false: [], true: ["rotate-90"] } },
  }
);

/**
 * The tree section component that can be used within `daikin-tree` component.
 *
 * The tree section accepts either a tree item or a tree section. By stacking tree sections, you can create a multi-level structure.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-section` ...
 *
 * @fires click - When an item in the tree section is clicked, it returns the open/closed status of the section.
 *
 * @slot - Tree item list slot. Place `daikin-tree-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-tree-section label="Tree section 1">
 *   <daikin-tree-item>Tree item 1-1</daikin-tree-item>
 *   <daikin-tree-item>Tree item 1-2</daikin-tree-item>
 *   <daikin-tree-item>Tree item 1-3</daikin-tree-item>
 * </daikin-tree-section>
 * ```
 */
@customElement("daikin-tree-section")
export class DaikinTreeSection extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  /**
   * Label of tree section
   */
  @property({ type: String })
  label: string = "";

  /**
   * Whether the tree section is selected
   */
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  /**
   * Whether the tree section is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Whether the tree section is open
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  /**
   * This receives the number of levels in the tree section. This is not specified by the user.
   */
  @property({ type: Number })
  hierarchy: number = 0;

  @queryAssignedElements({ selector: "daikin-tree-section,daikin-tree-item" })
  _children!: (DaikinTreeSection | DaikinTreeItem)[];

  private _handleClick(): void {
    this.open = !this.open;
  }

  override render() {
    return html`<div
      role="treeitem"
      aria-labelledby=${this.label}
      aria-selected=${this.open}
    >
      <button
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        class=${cvaTreeChildren({
          disabled: this.disabled,
          selected: this.selected,
        })}
        style=${`--padding-left:${12 + this.hierarchy * 36}px`}
      >
        <span class=${cvaIconContainer({ open: this.open })}></span>
        <span>${this.label}</span>
      </button>
      <div role="group">${this.open ? html`<slot></slot>` : nothing}</div>
    </div>`;
  }

  protected override updated(): void {
    for (const item of this._children) {
      item.disabled = this.disabled;
      item.hierarchy = this.hierarchy + 1;
    }
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-section": DaikinTreeSection;
  }
}
