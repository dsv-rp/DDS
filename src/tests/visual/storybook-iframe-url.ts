function format(key: string, value: string | number | boolean): string {
  const strValue = typeof value === "boolean" ? `!${value}` : String(value);
  return `${encodeURIComponent(key)}:${encodeURIComponent(strValue)}`;
}

export function getStorybookIframeURL(
  id: string,
  args: Record<string, string | number | boolean | undefined>
): string {
  // TODO: add `no-bg=1` to remove bg
  return `/iframe.html?viewMode=story&no-autoplay=1&color-scheme-override=${args.$theme ?? "light"}&id=${encodeURIComponent(id)}&args=${Object.entries(
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
