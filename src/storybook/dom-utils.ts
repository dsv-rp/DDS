/**
 * An alternative function to `toBeVisible()` checker which supports Shadow DOM slots.
 * @param element The element, possibly inside a slot, to test
 * @returns `true` if visible
 */
export function isVisible(element: Element): boolean {
  const { width, height } = element.getBoundingClientRect();
  return width !== 0 && height !== 0;
}

/**
 * Returns whether the element is visible and is in the viewport.
 * @param element The element to test
 * @returns `true` if the element is visible and in viewport.
 */
export function isInViewport(element: Element): boolean {
  const { top, left, right, bottom, width, height } =
    element.getBoundingClientRect();
  return (
    width !== 0 &&
    height !== 0 &&
    top >= 0 &&
    left >= 0 &&
    right <= document.documentElement.clientWidth &&
    bottom <= document.documentElement.clientHeight
  );
}
