import type { DaikinSlider } from "./daikin-slider";

/**
 * This function is used to handle floating-point errors in calculations.
 * Ensuring that the number of decimal places matches the decimal places of the step value.
 *
 * @param value The current value.
 * @param step The step value.
 * @returns Formatted current value.
 */
export function formatValue(value: number, step: string) {
  const decimals = step.includes(".") ? step.split(".")[1].length : 0;
  const clampedValue = parseFloat(value.toFixed(decimals));
  return `${clampedValue}`;
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
  const clampedValue = Math.max(minFloat, Math.min(maxFloat, steppedValue));
  return formatValue(clampedValue, slider.step);
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
