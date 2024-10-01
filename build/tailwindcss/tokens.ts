import plugin from "tailwindcss/plugin";
import designTokens from "../design-tokens.json" with { type: "json" };

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
): Record<TokenType, Record<string, string>> {
  return Object.entries(designTokens).reduce<
    Partial<Record<TokenType, Partial<Record<string, string>>>>
  >((acc, [key, [value, type]]) => {
    const object = (acc[type as TokenType] ??= {});
    object[`${keyPrefix}${key}`] = `var(${cssVarPrefix}${key}) /* ${value} */`;
    return acc;
  }, {}) as Record<TokenType, Record<string, string>>;
}

export const tokensPlugin = plugin.withOptions<{
  prefix: string;
  cssVarPrefix: string;
}>(
  ({ prefix, cssVarPrefix }) =>
    ({ addUtilities }) => {
      const perTypeTokenMap = createPerTypeTokenMap(prefix, cssVarPrefix);

      // Add `border-ddt-*`.
      addUtilities(
        Object.entries(perTypeTokenMap.border).map(([key, value]) => ({
          [`.border-${key}`]: {
            border: value,
          },
        }))
      );

      // Add `font-ddt-*`.
      addUtilities(
        Object.entries(perTypeTokenMap.typography).map(([key, value]) => ({
          [`.type-${key}`]: {
            font: value,
          },
        }))
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
