import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";

type ElementType = DaikinTreeSection | DaikinTreeItem | null;

/**
 * A tree list component.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 *
 * @slot - Tree section and tree item list slot. Place `daikin-tree-section` or `daikin-tree-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-tree>
 *   <daikin-tree-section label="Tree section 1">
 *     <daikin-tree-item>Tree item 1-1</daikin-tree-item>
 *     <daikin-tree-item>Tree item 1-2</daikin-tree-item>
 *     <daikin-tree-item>Tree item 1-3</daikin-tree-item>
 *   </daikin-tree-section>
 *   <daikin-tree-item>Tree item 2</daikin-tree-item>
 * </daikin-tree>
 * ```
 */
@customElement("daikin-tree")
export class DaikinTree extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  @state()
  previousElement: ElementType = null;

  @state()
  nextElement: ElementType = null;

  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset =
      (
        {
          ArrowLeft: "left",
          ArrowRight: "right",
          ArrowDown: "down",
          ArrowUp: "up",
        } as const
      )[event.key] ?? "";

    const focused = document.activeElement;
    const isSection = !!(focused?.tagName === "DAIKIN-TREE-SECTION");
    const isItem = !!(focused?.tagName === "DAIKIN-TREE-ITEM");

    const getNextElement = (element: Element | null, isRetry?: boolean) => {
      const nextElement = element?.nextElementSibling;

      if (!isRetry && isSection && (element as DaikinTreeSection).open) {
        this.nextElement = (element?.firstElementChild ?? null) as ElementType;
        return;
      }

      if (nextElement) {
        this.nextElement = nextElement as ElementType;
      } else {
        if (!(element?.parentElement?.nextElementSibling ?? null)) {
          getNextElement(element?.parentElement ?? null, true);
        } else {
          this.nextElement = element?.parentElement
            ?.nextElementSibling as ElementType;
        }
      }
    };

    const getPreviousDeepElement = (element: Element | null) => {
      if (
        element?.lastElementChild?.tagName === "DAIKIN-TREE-SECTION" &&
        (element.lastElementChild as DaikinTreeSection).open
      ) {
        getPreviousDeepElement(element.lastElementChild);
      } else {
        this.previousElement = (element?.lastElementChild ??
          null) as ElementType;
      }
    };

    const getPreviousElement = (element: Element | null) => {
      const previousElement = element?.previousElementSibling;
      const parentElement = element?.parentElement;

      if (
        previousElement &&
        previousElement.tagName === "DAIKIN-TREE-SECTION" &&
        (previousElement as DaikinTreeSection).open
      ) {
        if (
          previousElement.lastElementChild?.tagName === "DAIKIN-TREE-SECTION" &&
          (previousElement.lastElementChild as DaikinTreeSection).open
        ) {
          getPreviousDeepElement(previousElement.lastElementChild);
        } else {
          this.previousElement = (previousElement.lastElementChild ??
            null) as DaikinTreeSection | null;
        }

        return;
      }

      if (previousElement) {
        this.previousElement = previousElement as ElementType;
      } else if (
        ["DAIKIN-TREE-SECTION", "DAIKIN-TREE-ITEM"].includes(
          parentElement?.tagName ?? ""
        )
      ) {
        this.previousElement = parentElement as ElementType;
      }
    };

    const checkNextElement = () => {
      if (this.nextElement?.disabled) {
        getNextElement(this.nextElement);
        checkNextElement();
      } else {
        this.nextElement?.focus();
      }
    };

    const checkPreviousElement = () => {
      if (this.previousElement?.disabled) {
        getPreviousElement(this.previousElement);
        checkPreviousElement();
      } else {
        this.previousElement?.focus();
      }
    };

    switch (moveOffset) {
      case "down": {
        getNextElement(focused);
        checkNextElement();
        break;
      }

      case "up": {
        getPreviousElement(focused);
        checkPreviousElement();

        break;
      }

      case "left": {
        if (isItem) {
          focused.parentElement?.focus();
        }

        (document.activeElement as DaikinTreeSection).open = false;

        break;
      }

      case "right": {
        if (isItem) {
          (focused.nextElementSibling as HTMLElement | null)?.focus();
          return;
        }

        if ((focused as DaikinTreeSection).open) {
          ((focused?.firstElementChild ?? null) as ElementType)?.focus();
        } else {
          (focused as DaikinTreeSection).open = true;
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  override render() {
    return html`<div role="tree" @keydown=${this._handleKeyDown}>
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree": DaikinTree;
  }
}