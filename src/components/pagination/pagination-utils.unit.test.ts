import { describe, it } from "vitest";
import { calculatePagination, sequence } from "./pagination-utils";

describe("test calculatePagination function when total is odd number and window is odd number", () => {
  it("test calculatePagination when total: 15, current: 1, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 2, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 3, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 4, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 5, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 6, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 7, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 8, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 9, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 10, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 11, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 12, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 13, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 14, window: 7", ({
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

  it("test calculatePagination when total: 15, current: 15, window: 7", ({
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

describe("test calculatePagination function when total is odd number and window is even number", () => {
  it("test calculatePagination when total: 15, current: 1, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 2, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 3, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 4, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 5, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 6, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 7, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 8, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 9, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 10, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 11, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 12, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 13, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 14, window: 8", ({
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

  it("test calculatePagination when total: 15, current: 15, window: 8", ({
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
  it("test calculatePagination when total: 10, current: 3, window: 5", ({
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

  it("test calculatePagination when total: 10, current: 8, window: 5", ({
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

  it("test calculatePagination when total: 6, current: 2, window: 5", ({
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

  it("test calculatePagination when total: 5, current: 3, window: 5", ({
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

  it("test calculatePagination when total: 10, current: 3, window: 6", ({
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

  it("test calculatePagination when total: 10, current: 4, window: 6", ({
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
          "pages": [
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

  it("test calculatePagination when total: 10, current: 2, window: 5", ({
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

  it("test calculatePagination when total: 10, current: 4, window: 5", ({
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

  it("test calculatePagination when total: 4, current: 2, window: 5", ({
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
  it("test calculatePagination when total: 6, current: 1, window: 4", ({
    expect,
  }) => {
    const result = calculatePagination(6, 1, 4);
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
  it("test calculatePagination when total: 0, current: 2, window: 5", ({
    expect,
  }) => {
    const result = calculatePagination(0, 2, 4);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "page": 1,
          "type": "page",
        },
      ]
    `);
  });
});

describe("test range function", () => {
  it("test range when start: 1, stop: 5", ({ expect }) => {
    const result = sequence(1, 5);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("test range when start: 2, stop: 6", ({ expect }) => {
    const result = sequence(2, 6);
    expect(result).toEqual([2, 3, 4, 5]);
  });
});
