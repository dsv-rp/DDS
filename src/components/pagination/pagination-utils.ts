interface Page {
  type: "page";
  page: number;
}

interface Ellipsis {
  type: "ellipsis";
  pages: number[];
}

export type PaginationContent = (Page | Ellipsis)[];

/**
 * Generates an array of a sequence of numbers in the sequence `[begin, end)`.
 *
 * @param begin The value of the first element in the generated array.
 * @param end The value of the last element of the generated array + 1.
 * @returns An array of increasing sequences. Empty if `begin` is greater than or equal to `end`.
 */
export function sequence(begin: number, end: number): number[] {
  const length = Math.max(end - begin, 0);
  return Array.from({ length }, (_, i) => begin + i);
}

export function pageSequence(begin: number, end: number): Page[] {
  return sequence(begin, end).map((page): Page => ({ type: "page", page }));
}

/**
 * Calculate the display and hidden page items.
 *
 * @param total The total pages number.
 * @param current The current page number.
 * @param window Number of elements to display in pagination.
 * @returns {PaginationContent}.
 */
export function calculatePagination(
  total: number,
  current: number,
  window: number
): PaginationContent {
  if (window < 5) {
    window = 5;
  }
  if (total <= window) {
    // All pages can be displayed within `window`.
    return pageSequence(1, total + 1);
  }
  // Calculates the left and right page numbers of the page numbers in the middle.
  // These values will only be correct if there is an omission on both sides.
  // If there is one or no omissions, it is only guaranteed that `centerLeft` will be less than or equal to 3 (if there is no left omission), or `centerRight` will be greater than or equal to `total - 2`.
  const centerLeft = current - Math.floor((window - 5) / 2);
  const centerRight = centerLeft + window - 5;
  // The first page to the current page can be displayed in the `window`.
  // Only the right side needs an ellipsis.
  if (centerLeft <= 3) {
    return [
      ...pageSequence(1, window - 1),
      { type: "ellipsis", pages: sequence(window - 1, total) },
      { type: "page", page: total },
    ];
  }
  if (centerRight >= total - 2) {
    return [
      { type: "page", page: 1 },
      { type: "ellipsis", pages: sequence(2, total - (window - 3)) },
      ...sequence(total - (window - 3), total).map(
        (value) => ({ type: "page", page: value }) as Page
      ),
      { type: "page", page: total },
    ];
  }

  return [
    { type: "page", page: 1 },
    { type: "ellipsis", pages: sequence(2, centerLeft) },
    ...pageSequence(centerLeft, centerRight + 1),
    { type: "ellipsis", pages: sequence(centerRight + 1, total) },
    { type: "page", page: total },
  ];
}
