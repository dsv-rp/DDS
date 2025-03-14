/** Token type of style-dictionary */
export type SDTokenType =
  | "border"
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontSize"
  | "fontWeight"
  | "lineHeight"
  | "shadow"
  | "typography";

export type UnifiedTokenType =
  | SDTokenType
  | "borderRadius"
  | "borderWidth"
  | "spacing"
  | "sizing";

export function unifyTokenType(
  sdType: SDTokenType,
  tsType: string | null
): UnifiedTokenType {
  switch (tsType) {
    case "borderWidth":
    case "borderRadius":
    case "sizing":
    case "spacing":
      return tsType;

    default:
      return sdType;
  }
}
