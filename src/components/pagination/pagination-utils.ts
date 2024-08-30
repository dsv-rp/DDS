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

  let adjustFlag = 0;
  if ((pageWindow - 3) % 2 === 0) {
    adjustFlag = 1;
  }

  const noHideLeftFlag = pageWindow === 6 ? 4 : pageWindow - 3;
  if (currentPage < noHideLeftFlag) {
    result.middle = range(2, pageWindow - 1);
    result.rightEllipsis = range(pageWindow - 1, lastPage);
    return result;
  }
  if (currentPage > lastPage - 1 - Math.floor((pageWindow - 3) / 2)) {
    result.leftEllipsis = range(2, lastPage - (pageWindow - 3));
    result.middle = range(lastPage - (pageWindow - 3), lastPage);
    return result;
  }
  const leftPages = Math.max(2, currentPage - Math.floor((pageWindow - 3) / 2));
  const rightPages = Math.min(
    lastPage - 1,
    currentPage + Math.floor((pageWindow - 3) / 2)
  );
  if (currentPage === leftPages) {
    result.middle = range(leftPages, rightPages + 1);
    result.rightEllipsis = range(rightPages + 1, lastPage);
    return result;
  }
  if (leftPages >= 2) {
    result.leftEllipsis = range(2, leftPages + adjustFlag);
  }
  if (rightPages <= lastPage - 1) {
    result.rightEllipsis = range(rightPages, lastPage);
  }
  result.middle = range(leftPages + adjustFlag, rightPages);
  return result;
}
