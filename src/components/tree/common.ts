import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";

export type Direction = "up" | "down" | "left" | "right";
export type DirectionDispatched = Exclude<Direction, "right">;

export type TreeMoveFocusEventDetail = {
  direction: DirectionDispatched;
};
export type TreeMoveFocusEvent = CustomEvent<TreeMoveFocusEventDetail>;

/**
 * Get direction from key name.
 * @param key `event.key` where `event` is `KeyboardEvent`
 * @returns direction
 */
export function getDirectionFromKey(key: string): Direction | undefined {
  return (
    {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    } as const
  )[key];
}

/**
 * Common `tree-move-focus` event handler for `daikin-tree` and `daikin-tree-section`.
 * Moves the focus up or down among the children.
 * If it reaches the end, it returns `false` without moving the focus.
 *
 * @param event `TreeMoveFocusEvent`
 * @param children Children in the slot.
 * @returns `true` if moved focus. `false` if not moved focus because reached the end. `undefined` if not processed.
 */
function handleTreeMoveFocusCommon(
  event: TreeMoveFocusEvent,
  children: readonly (DaikinTreeSection | DaikinTreeItem)[]
): boolean | undefined {
  const moveOffset = {
    up: -1,
    down: 1,
    left: 0,
  }[event.detail.direction];
  if (!moveOffset) {
    return;
  }

  const target = event.target as HTMLElement;

  const enabledChildren = children.filter(({ disabled }) => !disabled);

  // Determine the sender's position within the children in the enabled state.
  // NOTE: This assumes that the disabled children do not emit event, meaning that there is no enabled item in the descendants of a disabled child.
  const focusedItemIndex = enabledChildren.findIndex((item) => item === target);
  if (focusedItemIndex < 0) {
    return;
  }

  event.stopPropagation();

  // Get the child to focus.
  const child = enabledChildren[focusedItemIndex + moveOffset] as
    | DaikinTreeSection
    | DaikinTreeItem
    | undefined;
  if (!child) {
    return false;
  }

  if (moveOffset > 0) {
    // When moving down, focus on the next sibling section header (if it's `daikin-tree-section`) or item (if it's `daikin-tree-item`).
    child.focus();
  } else {
    // When moving up, we need to focus on the deepest element that is expanded in the previous sibling.
    child.focusLastItem();
  }
  return true;
}

/**
 * `tree-move-focus` event handler for `daikin-tree-section`.
 *
 * @param section `daikin-tree-section`
 * @param event `TreeMoveFocusEvent`
 * @param children Children in the slot.
 */
export function handleTreeMoveFocusSection(
  section: DaikinTreeSection,
  event: TreeMoveFocusEvent,
  children: readonly (DaikinTreeSection | DaikinTreeItem)[]
): void {
  const { direction } = event.detail;
  if (direction === "left") {
    // When there is a request to move the focus to the left from the child, the focus is moved to the header of the section itself.
    // When the left key is pressed next time, the header is closed or the `tree-move-focus` event is fired by the `keydown` event handler.
    event.stopPropagation();
    section.focus();
  } else {
    // Move the focus up or down among the children.
    const result = handleTreeMoveFocusCommon(event, children);
    // When we reach the end, move the focus to the higher level.
    if (result === false) {
      if (direction === "up") {
        // As the section header is positioned above the first child, move the focus to it.
        section.focus();
      } else {
        // The event is fired at the parent (section or route).
        // This part is executed recursively until it reaches an element that is not the last child or the root.
        emitTreeMoveFocus(section, "down");
      }
    }
  }
}

/**
 * `tree-move-focus` event handler for `daikin-tree`.
 *
 * @param event `TreeMoveFocusEvent`
 * @param children Children in the slot.
 */
export function handleTreeMoveFocusRoot(
  event: TreeMoveFocusEvent,
  children: readonly (DaikinTreeSection | DaikinTreeItem)[]
): void {
  handleTreeMoveFocusCommon(event, children);
  // There is nothing to be done when the focus reaches the end for the root element.
}

export function emitTreeMoveFocus(
  target: HTMLElement,
  direction: DirectionDispatched
): void {
  target.dispatchEvent(
    new CustomEvent("tree-move-focus", {
      detail: {
        direction,
      },
      composed: true,
      bubbles: true,
    })
  );
}
