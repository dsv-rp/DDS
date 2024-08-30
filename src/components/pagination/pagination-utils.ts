import type { PaginationContent } from "./daikin-pagination";

export const range = (start: number, stop: number, step: number = 1) => {
  const length = Math.max(Math.ceil((stop - start) / step), 0);
  return Array.from({ length: length }, (_, i) => start + i * step);
};

export function calculatePagination(
  lastPage: number,
  currentPage: number,
  pageWindow: number
): PaginationContent {
  // ...
  const result = {
    leftMost: 1,
    leftEllipsis: [],
    middle: [],
    rightEllipsis: [],
    rightMost: lastPage,
  } as PaginationContent;
  if (pageWindow < 5) {
    pageWindow = 5;
  }
  if (lastPage <= pageWindow) {
    result.middle = range(2, lastPage, 1);
    return result;
  }
  const adjustFlag = (pageWindow - 3) % 2 === 0 ? 1 : 0;
  if (currentPage < pageWindow - 2) {
    result.middle = range(2, pageWindow - 1);
    result.rightEllipsis = range(pageWindow - 1, lastPage);
    return result;
  }
  if (currentPage > lastPage - 2 - Math.floor((pageWindow - 3) / 2)) {
    result.leftEllipsis = range(2, lastPage - (pageWindow - 3));
    result.middle = range(lastPage - (pageWindow - 3), lastPage);
    return result;
  }
  const leftPages = Math.max(2, currentPage - Math.floor((pageWindow - 3) / 2));
  const rightPages = Math.min(
    lastPage - 1,
    currentPage + Math.floor((pageWindow - 3) / 2)
  );
  result.leftEllipsis = range(2, leftPages + adjustFlag);
  result.rightEllipsis = range(rightPages, lastPage);
  result.middle = range(leftPages + adjustFlag, rightPages);
  return result;
}
