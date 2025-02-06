import type { DaikinSlider } from "./daikin-slider";

/**
 * Returns a normalized numerical representation.
 *
 * - Removes trailing zeros from the decimal part.
 * - Removes the decimal point if it becomes the last character.
 * - Removes leading zeros from the integer part.
 *
 * @param str A numeric string.
 * @returns Formatted value.
 */
export function normalizeNumberString(str: string): string {
  return (
    str
      .replace(/(?:\.0*|(?<=\.\d*?)0+)$/, "")
      .replace(/^0+/, "")
      .replace(/^(\.(?=\d))/, "0.") || "0"
  );
}

/**
 * This function is used to handle floating-point errors in calculations.
 * Ensuring that the number of decimal places matches the decimal places of the step value.
 *
 * @param value The current value.
 * @param step The step value.
 * @returns Formatted current value.
 */
export function formatValue(value: number, step: string) {
  // Get the length of fractional part excluding trailing zeros.
  const decimals = /\.(\d*?)0*$/.exec(step)?.[1]?.length ?? 0;
  // Format the value.
  const formattedValue = value.toFixed(decimals);
  // Remove trailing zeros if the fractional part exists.
  return normalizeNumberString(formattedValue);
}

/**
 * Get the current value and track bar's progress percentage from the distance to the left.
 *
 * @param slider The daikin-slider instance.
 * @param ratio The ratio of the slider value (0-1).
 * @returns Current value.
 */
export function getValueFromRatio(slider: DaikinSlider, ratio: number): string {
  const minFloat = parseFloat(slider.min);
  const maxFloat = parseFloat(slider.max);
  const stepFloat = parseFloat(slider.step);
  const rawValue = ratio * (maxFloat - minFloat) + minFloat;
  const steppedValue = Math.round(rawValue / stepFloat) * stepFloat;
  if (steppedValue <= minFloat) {
    return normalizeNumberString(slider.min);
  }
  if (steppedValue >= maxFloat) {
    return normalizeNumberString(slider.max);
  }
  return formatValue(steppedValue, slider.step);
}

/**
 * Get the current value and track bar's progress percentage when use keyboard.
 *
 * @param slider The daikin-slider instance.
 * @param moveOffset The number of thumb icon's move offset.
 * @returns Current value.
 */
export function getValueByKeydown(
  slider: DaikinSlider,
  key: string
): string | undefined {
  if (key === "Home") {
    return slider.min;
  }
  if (key === "End") {
    return slider.max;
  }
  const offset = {
    ArrowLeft: -1,
    ArrowDown: -1,
    ArrowRight: 1,
    ArrowUp: 1,
    PageDown: -10,
    PageUp: 10,
  }[key];
  if (!offset) {
    return;
  }
  const minFloat = parseFloat(slider.min);
  const maxFloat = parseFloat(slider.max);
  const stepFloat = parseFloat(slider.step);
  const valueFloat = parseFloat(slider.value);
  const clampedValue = Math.max(
    minFloat,
    Math.min(maxFloat, valueFloat + stepFloat * offset)
  );
  return formatValue(clampedValue, slider.step);
}
