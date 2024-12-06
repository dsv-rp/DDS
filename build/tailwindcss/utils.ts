/**
 * `flattenColorPalette` from TailwindCSS v3.4.10. MIT Licensed.
 * @see https://github.com/tailwindlabs/tailwindcss/blob/main/src/util/flattenColorPalette.js
 */
export function flattenColorPalette(
  colors?: Record<string, string | Record<string, string>>
): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == "object"
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
          }))
        : [{ [String(color)]: values }]
    )
  );
}

/**
 * `toColorValue` from TailwindCSS v3.4.10. MIT Licensed.
 * @see https://github.com/tailwindlabs/tailwindcss/blob/main/src/util/toColorValue.js
 */
export function toColorValue(
  maybeFunction: string | ((arg: unknown) => string)
): string {
  return typeof maybeFunction === "function"
    ? maybeFunction({})
    : maybeFunction;
}
