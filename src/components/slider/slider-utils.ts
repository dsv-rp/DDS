import type { DaikinSlider } from "./daikin-slider";

/**
 * Change the slider properties from string to float for calculate.
 *
 * @param min The min value of the slider.
 * @param max The max value of the slider.
 * @param step The step of the slider.
 * @param value The current value of the slider.
 * @returns An array of parsed float value.
 */
export function parsedToFloat(
  min: string,
  max: string,
  step: string,
  value: string
): number[] {
  const minFloat = parseFloat(min);
  const maxFloat = parseFloat(max);
  const stepFloat = parseFloat(step);
  const valueFloat = parseFloat(value);
  return [minFloat, maxFloat, stepFloat, valueFloat];
}

/**
 * Get the current value and track bar's progress percentage from the distance to the left.
 *
 * @param leftDistance The thumb's distance percentage of all slider width.
 * @param slider The daikin-slider instance.
 * @returns An array of a string current value and a number progress percentage.
 */
export function getValueAndProgressFromCoordinate(
  slider: DaikinSlider,
  leftDistance: number
): [string, number] {
  console.log(leftDistance);
  const [minFloat, maxFloat, stepFloat] = parsedToFloat(
    slider.min,
    slider.max,
    slider.step,
    slider.value
  );
  const decimals = slider.step.includes(".")
    ? slider.step.split(".")[1].length
    : 0;

  const rawValue = leftDistance * (maxFloat - minFloat) + minFloat;
  const steppedValue = Math.round(rawValue / stepFloat) * stepFloat;
  const clampedValue = Math.max(
    minFloat,
    Math.min(maxFloat, parseFloat(steppedValue.toFixed(decimals)))
  );
  return [`${clampedValue}`, leftDistance * 100];
}
