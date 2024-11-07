import { describe, it } from "vitest";
import { calculatePagination, range } from "./pagination-utils";

describe("test calculatePagination function when lastPage is odd number and pageWindow is odd number", () => {
  it("test calculatePagination when lastPage: 15, currentPage: 1, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 1, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "pages": [
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 2, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 2, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "pages": [
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 3, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 3, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "pages": [
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 4, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 4, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "pages": [
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 5, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 5, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
          ],
          "type": "ellipsis",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "pages": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 6, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 6, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
          ],
          "type": "ellipsis",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "pages": [
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 7, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 7, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
          ],
          "type": "ellipsis",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "pages": [
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 8, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 8, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
          ],
          "type": "ellipsis",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "pages": [
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 9, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 9, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
          ],
          "type": "ellipsis",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "pages": [
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 10, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 10, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
          ],
          "type": "ellipsis",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "pages": [
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 11, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 11, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "pages": [
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 12, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 12, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
          ],
          "type": "ellipsis",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 13, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 13, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
          ],
          "type": "ellipsis",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 14, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 14, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
          ],
          "type": "ellipsis",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 15, pageWindow: 7", ({
    expect,
  }) => {
    const result = calculatePagination(15, 15, 7);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
          ],
          "type": "ellipsis",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });
});

describe("test calculatePagination function when lastPage is odd number and pageWindow is even number", () => {
  it("test calculatePagination when lastPage: 15, currentPage: 1, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 1, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "pages": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 2, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 2, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "pages": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 3, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 3, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "pages": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 4, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 4, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "pages": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 5, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 5, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "pages": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 6, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 6, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
          ],
          "type": "ellipsis",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "pages": [
            8,
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 7, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 7, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
          ],
          "type": "ellipsis",
        },
        {
          "page": 5,
          "type": "page",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "pages": [
            9,
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 8, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 8, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
          ],
          "type": "ellipsis",
        },
        {
          "page": 6,
          "type": "page",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "pages": [
            10,
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 9, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 9, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
          ],
          "type": "ellipsis",
        },
        {
          "page": 7,
          "type": "page",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "pages": [
            11,
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 10, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 10, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
          ],
          "type": "ellipsis",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "pages": [
            12,
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 11, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 11, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
          ],
          "type": "ellipsis",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "pages": [
            13,
            14,
          ],
          "type": "ellipsis",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 12, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 12, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 13, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 13, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 14, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 14, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 15, currentPage: 15, pageWindow: 8", ({
    expect,
  }) => {
    const result = calculatePagination(15, 15, 8);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
        {
          "page": 11,
          "type": "page",
        },
        {
          "page": 12,
          "type": "page",
        },
        {
          "page": 13,
          "type": "page",
        },
        {
          "page": 14,
          "type": "page",
        },
        {
          "page": 15,
          "type": "page",
        },
      ]
    `);
  });
});

describe("test calculatePagination some special case", () => {
  it("test calculatePagination when lastPage: 10, currentPage: 3, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 3, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
          ],
          "type": "ellipsis",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "pages": [
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 10, currentPage: 8, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 8, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
            4,
            5,
            6,
            7,
          ],
          "type": "ellipsis",
        },
        {
          "page": 8,
          "type": "page",
        },
        {
          "page": 9,
          "type": "page",
        },
        {
          "page": 10,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 6, currentPage: 2, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(6, 2, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "pages": [
            4,
            5,
          ],
          "type": "ellipsis",
        },
        {
          "page": 6,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 5, currentPage: 3, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(5, 3, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "page": 5,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 10, currentPage: 3, pageWindow: 6", ({
    expect,
  }) => {
    const result = calculatePagination(10, 3, 6);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "pages": [
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 10, currentPage: 4, pageWindow: 6", ({
    expect,
  }) => {
    const result = calculatePagination(10, 4, 6);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
          ],
          "type": "ellipsis",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "pages": [
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 10, currentPage: 2, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 2, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "pages": [
            4,
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 10, currentPage: 4, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(10, 4, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "pages": [
            2,
            3,
          ],
          "type": "ellipsis",
        },
        {
          "page": 4,
          "type": "page",
        },
        {
          "pages": [
            5,
            6,
            7,
            8,
            9,
          ],
          "type": "ellipsis",
        },
        {
          "page": 10,
          "type": "page",
        },
      ]
    `);
  });

  it("test calculatePagination when lastPage: 4, currentPage: 2, pageWindow: 5", ({
    expect,
  }) => {
    const result = calculatePagination(4, 2, 5);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
        {
          "page": 2,
          "type": "page",
        },
        {
          "page": 3,
          "type": "page",
        },
        {
          "page": 4,
          "type": "page",
        },
      ]
    `);
  });
});

describe("test range function", () => {
  it("test range when start: 1, stop: 5", ({ expect }) => {
    const result = range(1, 5);
    expect(result).toMatchInlineSnapshot([1, 2, 3, 4]);
  });

  it("test range when start: 2, stop: 6", ({ expect }) => {
    const result = range(2, 6);
    expect(result).toMatchInlineSnapshot([2, 3, 4, 5]);
  });

  it("test range when start: 1, stop: 10, step: 2", ({ expect }) => {
    const result = range(1, 10, 2);
    expect(result).toMatchInlineSnapshot([1, 3, 5, 7, 9]);
  });
});
