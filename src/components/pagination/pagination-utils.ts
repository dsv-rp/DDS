/**
 * leftMost: mean page 1
 * leftEllipsis: mean the page which hidden in the left ellipsis button
 * middle: mean the page be showed except first page and last page
 * rightEllipsis: mean the page which hidden in the right ellipsis button
 * rightMost: mean the last page
 */
// export interface PaginationContent {
//   leftMost: number;
//   leftEllipsis: number[];
//   middle: number[];
//   rightEllipsis: number[];
//   rightMost: number;
// }

interface Page {
  type: "page";
  page: number;
}

interface Ellipsis {
  type: "ellipsis";
  pages: number[];
}

export type PaginationContent = (Page | Ellipsis)[];

export const range = (start: number, stop: number, step: number = 1) => {
  const length = Math.max(Math.ceil((stop - start) / step), 0);
  return Array.from({ length: length }, (_, i) => start + i * step);
};

export function calculatePagination(
  lastPage: number,
  currentPage: number,
  pageWindow: number
): PaginationContent {
  if (pageWindow < 5) {
    pageWindow = 5;
  }
  if (lastPage <= pageWindow) {
    // result.middle = range(2, lastPage);
    return [
      ...range(1, lastPage + 1).map(
        (value) => ({ type: "page", page: value }) as Page
      ),
    ];
  }
  if (currentPage < pageWindow - 2) {
    return [
      ...range(1, pageWindow - 1).map(
        (value) => ({ type: "page", page: value }) as Page
      ),
      { type: "ellipsis", pages: range(pageWindow - 1, lastPage) },
      { type: "page", page: lastPage },
    ];
  }
  if (currentPage > lastPage - 2 - Math.floor((pageWindow - 3) / 2)) {
    return [
      { type: "page", page: 1 },
      { type: "ellipsis", pages: range(2, lastPage - (pageWindow - 3)) },
      ...range(lastPage - (pageWindow - 3), lastPage).map(
        (value) => ({ type: "page", page: value }) as Page
      ),
      { type: "page", page: lastPage },
    ];
  }

  const adjustFlag = (pageWindow - 3) % 2 === 0 ? 1 : 0;
  const leftPages = currentPage - Math.floor((pageWindow - 3) / 2);
  const rightPages = currentPage + Math.floor((pageWindow - 3) / 2);
  // result.leftEllipsis = range(2, leftPages + adjustFlag);
  // result.rightEllipsis = range(rightPages, lastPage);
  // result.middle = range(leftPages + adjustFlag, rightPages);
  return [
    { type: "page", page: 1 },
    { type: "ellipsis", pages: range(2, leftPages + adjustFlag) },
    ...range(leftPages + adjustFlag, rightPages).map(
      (value) => ({ type: "page", page: value }) as Page
    ),
    { type: "ellipsis", pages: range(rightPages, lastPage) },
    { type: "page", page: lastPage },
  ];
}
