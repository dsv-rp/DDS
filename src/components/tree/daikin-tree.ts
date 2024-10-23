import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";

type DirectionType = "down" | "up" | "left" | "right";

type OptionType = {
  previousParent?: boolean;
};

export type MoveFocusEventType = {
  direction: DirectionType;
  option?: OptionType;
};

export const getDirection: (
  event: KeyboardEvent
) => DirectionType | undefined = (event: KeyboardEvent) =>
  (
    ({
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "up",
    }) as const
  )[event.key];

export const operationChildrenFocus = (
  target: HTMLElement,
  direction: "down" | "up" | "right",
  children: readonly (DaikinTreeSection | DaikinTreeItem)[],
  option?: OptionType
) => {
  const moveOffset = direction === "up" ? -1 : 1;

  const focusedItemIndex = children.findIndex((item) => item === target);

  if (option?.previousParent) {
    target.focus();
    return;
  }

  // Focus on the first tree section that is enabled.
  for (
    let index = focusedItemIndex + moveOffset, i = 0;
    i < children.length;
    index += moveOffset, i++
  ) {
    index %= children.length;
    const item = children[index];
    const isNegative =
      index === -1 ||
      (!index && new Uint8Array(new Float32Array([index]).buffer)[3] === 128);

    if (isNegative && moveOffset === -1 && target.parentElement) {
      emitMoveFocus(target.parentElement, direction, {
        previousParent: true,
      });
      break;
    }

    if (
      focusedItemIndex === children.length - 1 &&
      moveOffset === 1 &&
      target.parentElement
    ) {
      emitMoveFocus(target.parentElement, direction);
      break;
    }

    if (item.disabled) {
      continue;
    }

    if (item.tagName === "DAIKIN-TREE-SECTION" && moveOffset === -1) {
      item.focusLastItem();
      break;
    }

    item.focus();
    break;
  }
};

export const emitMoveFocus = (
  target: HTMLElement,
  direction: DirectionType,
  option?: OptionType
) => {
  target.dispatchEvent(
    new CustomEvent("tree-move-focus", {
      detail: {
        direction,
        option,
      },
      bubbles: true,
    })
  );
};

/**
 * The tree component is a component that creates a hierarchical list. You can create a hierarchical structure by placing tree section components and tree item components under the parent tree component.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-section` ...
 * - `daikin-tree` > `daikin-tree-item`
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

  @queryAssignedElements({ selector: "daikin-tree-section,daikin-tree-item" })
  private readonly _children!: readonly (DaikinTreeSection | DaikinTreeItem)[];

  private _handleMoveFocus(event: CustomEvent<MoveFocusEventType>) {
    event.stopPropagation();

    const direction = event.detail.direction;

    if (direction === "up" || direction === "down") {
      operationChildrenFocus(
        event.target as HTMLElement,
        direction,
        this._children,
        event.detail.option
      );
    }
  }

  override render() {
    return html`<div role="tree">
      <slot @tree-move-focus=${this._handleMoveFocus}></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree": DaikinTree;
  }
}
