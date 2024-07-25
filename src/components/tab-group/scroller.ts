export type Direction = "horizontal" | "vertical" | "either";

/**
 * Get practical parent element, with consideration for slots and shadow roots.
 *
 * @param element element
 * @returns The parent element (if any)
 */
export function getEffectiveParentElement(
  element: HTMLElement
): HTMLElement | null {
  return (
    element.assignedSlot ||
    element.parentElement ||
    ((element.parentNode as ShadowRoot | null)?.host as HTMLElement | null)
  );
}

function getBooleanForDirection(
  horizontal: boolean,
  vertical: boolean,
  direction: Direction
): boolean {
  return direction === "horizontal"
    ? horizontal
    : direction === "vertical"
      ? vertical
      : horizontal || vertical;
}

function isScrollableOverflowValue(overflow: string): boolean {
  return overflow !== "visible" && overflow !== "hidden" && overflow !== "clip";
}

/**
 * Get the first scrollable ancestor element.
 *
 * @param element element
 * @param direction scroll direction
 * @returns the first scrollable ancestor element (if any)
 */
export function getFirstScrollableAncestor(
  element: HTMLElement,
  direction: Direction
): HTMLElement | null {
  const parent = getEffectiveParentElement(element);
  if (!parent) {
    return null;
  }

  const overflow = getBooleanForDirection(
    parent.scrollWidth > parent.clientWidth,
    parent.scrollHeight > parent.clientHeight,
    direction
  );

  if (overflow) {
    const computedStyle = getComputedStyle(parent);
    const scrollableOverflow = getBooleanForDirection(
      isScrollableOverflowValue(computedStyle.overflowX),
      isScrollableOverflowValue(computedStyle.overflowY),
      direction
    );
    if (scrollableOverflow) {
      return parent;
    }
  }

  return getFirstScrollableAncestor(parent, direction);
}

export function calcScrollIntoViewOffset(
  target: HTMLElement,
  container: HTMLElement
): [x: number, y: number] {
  const bBoxContainer = container.getBoundingClientRect();
  const bBoxTarget = target.getBoundingClientRect();

  const scrollByX =
    // If the left end of the target is to the left of the container, align the left end of the target so that it is in the viewport.
    Math.min(bBoxTarget.left - bBoxContainer.left, 0) ||
    // If the right end of the target is to the right of the container, align the right end of the target so that it is in the viewport.
    Math.max(bBoxTarget.right - bBoxContainer.right, 0);
  const scrollByY =
    Math.min(bBoxTarget.top - bBoxContainer.top, 0) ||
    Math.max(bBoxTarget.bottom - bBoxContainer.bottom, 0);
  return [scrollByX, scrollByY];
}

/**
 * An alternative `.scrollIntoView()` function which only scrolls the first scrollable ancestor element.
 *
 * @param target target element
 * @param direction direction
 * @returns `true` if success, `false` if scrollable parent not found
 */
export function scrollIntoViewOnlyParent(
  target: HTMLElement,
  direction: Direction
): boolean {
  const scrollableParent = getFirstScrollableAncestor(target, direction);
  if (!scrollableParent) {
    return false;
  }

  let [scrollByX, scrollByY] = calcScrollIntoViewOffset(
    target,
    scrollableParent
  );
  if (direction === "horizontal") {
    scrollByY = 0;
  }
  if (direction === "vertical") {
    scrollByX = 0;
  }

  if (scrollByX || scrollByY) {
    scrollableParent.scrollBy(scrollByX, scrollByY);
  }
  return true;
}
