function format(key: string, value: string | number | boolean): string {
  const strValue = typeof value === "boolean" ? `!${value}` : String(value);
  return `${encodeURIComponent(key)}:${encodeURIComponent(strValue)}`;
}

export function getStorybookIframeURL<
  T extends Record<string, string | number | boolean | undefined>,
>(id: string, args: T): string {
  return `/iframe.html?viewMode=story&disable-autoplay=1&id=${encodeURIComponent(id)}&args=${Object.entries(
    args
  )
    .filter(
      (item): item is [string, string | number | boolean] =>
        item[1] != null &&
        typeof item[1] !== "object" &&
        typeof item[1] !== "function"
    )
    .map(([key, value]) => format(key, value))
    .join(";")}`;
}
