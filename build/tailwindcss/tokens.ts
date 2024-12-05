import designTokens from "@daikin-oss/dds-tokens/json/daikin/Light/tokens.json" with { type: "json" };
import plugin from "tailwindcss/plugin";

type TokenType =
  | "border"
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontSize"
  | "fontWeight"
  | "lineHeight"
  | "shadow"
  | "typography";

function createPerTypeTokenMap(
  keyPrefix: string,
  cssVarPrefix: string
): Partial<Record<TokenType, Record<string, string>>> {
  return Object.entries(designTokens).reduce<
    Partial<Record<TokenType, Partial<Record<string, string>>>>
  >((acc, [key, [value, type]]) => {
    const object = (acc[type as TokenType] ??= {});
    object[`${keyPrefix}${key}`] = `var(${cssVarPrefix}${key}) /* ${value} */`;
    return acc;
  }, {}) as Partial<Record<TokenType, Record<string, string>>>;
}

export const tokensPlugin = plugin.withOptions<{
  prefix: string;
  cssVarPrefix: string;
}>(
  ({ prefix, cssVarPrefix }) =>
    ({ addUtilities }) => {
      const perTypeTokenMap = createPerTypeTokenMap(prefix, cssVarPrefix);

      // Add `b-ddt-*` and `o-ddt-*`.
      addUtilities(
        Object.entries(perTypeTokenMap.border ?? {}).map(
          ([key, value]): Record<string, Record<string, string>> => ({
            [`.b-${key}`]: {
              border: value,
            },
            [`.bl-${key}`]: {
              "border-left": value,
            },
            [`.br-${key}`]: {
              "border-right": value,
            },
            [`.bt-${key}`]: {
              "border-top": value,
            },
            [`.bb-${key}`]: {
              "border-bottom": value,
            },
            [`.bx-${key}`]: {
              "border-left": value,
              "border-right": value,
            },
            [`.by-${key}`]: {
              "border-top": value,
              "border-bottom": value,
            },
            [`.o-${key}`]: {
              outline: value,
            },
          })
        )
      );

      // Add `type-ddt-*`.
      addUtilities(
        Object.entries(perTypeTokenMap.typography ?? {}).map(
          ([key, value]): Record<string, Record<string, string>> => ({
            [`.type-${key}`]: {
              font: value,
            },
          })
        )
      );
    },
  ({ prefix, cssVarPrefix }) => {
    const perTypeTokenMap = createPerTypeTokenMap(prefix, cssVarPrefix);

    return {
      theme: {
        extend: {
          colors: perTypeTokenMap.color,
          boxShadow: perTypeTokenMap.shadow,
          fontFamily: perTypeTokenMap.fontFamily,
          fontSize: perTypeTokenMap.fontSize,
          fontWeight: perTypeTokenMap.fontWeight,
          lineHeight: perTypeTokenMap.lineHeight,
          spacing: perTypeTokenMap.dimension,
        },
      },
    };
  }
);
