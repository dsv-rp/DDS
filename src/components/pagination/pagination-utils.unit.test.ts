import { describe, it } from "vitest";
import { calculatePagination, range } from "./pagination-utils";

describe("test calculatePagination function when lastPage is odd number and pageWindow is odd number", () => {
  it("test calculatePagination when lastPage: 15, currentPage: 1, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 1, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5],
      rightEllipsis: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 2, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 2, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5],
      rightEllipsis: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 3, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 3, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5],
      rightEllipsis: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 4, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 4, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5],
      rightEllipsis: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 5, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 5, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3],
      middle: [4, 5, 6],
      rightEllipsis: [7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 6, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 6, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4],
      middle: [5, 6, 7],
      rightEllipsis: [8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 7, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 7, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5],
      middle: [6, 7, 8],
      rightEllipsis: [9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 8, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 8, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6],
      middle: [7, 8, 9],
      rightEllipsis: [10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 9, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 9, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7],
      middle: [8, 9, 10],
      rightEllipsis: [11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 10, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 10, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8],
      middle: [9, 10, 11],
      rightEllipsis: [12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 11, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 11, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9],
      middle: [10, 11, 12],
      rightEllipsis: [13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 12, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 12, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      middle: [11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 13, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 13, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      middle: [11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 14, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 14, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      middle: [11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 15, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 15, 7);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      middle: [11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });
});

describe("test calculatePagination function when lastPage is odd number and pageWindow is even number", () => {
  it("test calculatePagination when lastPage: 15, currentPage: 1, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 1, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5, 6],
      rightEllipsis: [7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 2, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 2, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5, 6],
      rightEllipsis: [7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 3, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 3, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5, 6],
      rightEllipsis: [7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 4, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 4, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5, 6],
      rightEllipsis: [7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 5, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 5, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4, 5, 6],
      rightEllipsis: [7, 8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 6, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 6, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3],
      middle: [4, 5, 6, 7],
      rightEllipsis: [8, 9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 7, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 7, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4],
      middle: [5, 6, 7, 8],
      rightEllipsis: [9, 10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 8, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 8, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5],
      middle: [6, 7, 8, 9],
      rightEllipsis: [10, 11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 9, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 9, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6],
      middle: [7, 8, 9, 10],
      rightEllipsis: [11, 12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 10, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 10, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7],
      middle: [8, 9, 10, 11],
      rightEllipsis: [12, 13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 11, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 11, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8],
      middle: [9, 10, 11, 12],
      rightEllipsis: [13, 14],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 12, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 12, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9],
      middle: [10, 11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 13, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 13, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9],
      middle: [10, 11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 14, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 14, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9],
      middle: [10, 11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });

  it("test calculatePagination when lastPage: 15, currentPage: 15, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 15, 8);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7, 8, 9],
      middle: [10, 11, 12, 13, 14],
      rightEllipsis: [],
      rightMost: 15,
    });
  });
});

describe("test calculatePagination some special case", () => {
  it("test calculatePagination when lastPage: 10, currentPage: 3, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 3, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2],
      middle: [3],
      rightEllipsis: [4, 5, 6, 7, 8, 9],
      rightMost: 10,
    });
  });

  it("test calculatePagination when lastPage: 10, currentPage: 8, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 8, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3, 4, 5, 6, 7],
      middle: [8, 9],
      rightEllipsis: [],
      rightMost: 10,
    });
  });

  it("test calculatePagination when lastPage: 6, currentPage: 2, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(6, 2, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3],
      rightEllipsis: [4, 5],
      rightMost: 6,
    });
  });

  it("test calculatePagination when lastPage: 5, currentPage: 3, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(5, 3, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4],
      rightEllipsis: [],
      rightMost: 5,
    });
  });

  it("test calculatePagination when lastPage: 10, currentPage: 3, pageWindow: 6", ({
    expect,
  }) => {
    const result = calculatePagination(10, 3, 6);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3, 4],
      rightEllipsis: [5, 6, 7, 8, 9],
      rightMost: 10,
    });
  });

  it("test calculatePagination when lastPage: 10, currentPage: 4, pageWindow: 6", ({
    expect,
  }) => {
    const result = calculatePagination(10, 4, 6);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2],
      middle: [3, 4],
      rightEllipsis: [5, 6, 7, 8, 9],
      rightMost: 10,
    });
  });

  it("test calculatePagination when lastPage: 10, currentPage: 2, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 2, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3],
      rightEllipsis: [4, 5, 6, 7, 8, 9],
      rightMost: 10,
    });
  });

  it("test calculatePagination when lastPage: 10, currentPage: 4, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 4, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [2, 3],
      middle: [4],
      rightEllipsis: [5, 6, 7, 8, 9],
      rightMost: 10,
    });
  });

  it("test calculatePagination when lastPage: 4, currentPage: 2, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(4, 2, 5);
    expect(result).toEqual({
      leftMost: 1,
      leftEllipsis: [],
      middle: [2, 3],
      rightEllipsis: [],
      rightMost: 4,
    });
  });
});

describe("test range function", () => {
  it("test range when start: 1, stop: 5", ({ expect }) => {
    const result = range(1, 5);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("test range when start: 2, stop: 6", ({ expect }) => {
    const result = range(2, 6);
    expect(result).toEqual([2, 3, 4, 5]);
  });

  it("test range when start: 1, stop: 10, step: 2", ({ expect }) => {
    const result = range(1, 10, 2);
    expect(result).toEqual([1, 3, 5, 7, 9]);
  });
});
