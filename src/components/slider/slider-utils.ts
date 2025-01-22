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
  return [
    minFloat,
    maxFloat,
    stepFloat,
    Math.max(minFloat, Math.min(valueFloat, maxFloat)),
  ];
}

/**
 * Get the current value and track bar's progress percentage from the distance to the left.
 *
 * @param slider The daikin-slider instance.
 * @param ratio The ratio of the slider value (0-1).
 * @returns Current value.
 */
export function getValueFromRatio(slider: DaikinSlider, ratio: number): string {
  const [minFloat, maxFloat, stepFloat] = parsedToFloat(
    slider.min,
    slider.max,
    slider.step,
    slider.value
  );
  const decimals = slider.step.includes(".")
    ? slider.step.split(".")[1].length
    : 0;

  const rawValue = ratio * (maxFloat - minFloat) + minFloat;
  const steppedValue = Math.round(rawValue / stepFloat) * stepFloat;
  const clampedValue = Math.max(
    minFloat,
    Math.min(maxFloat, parseFloat(steppedValue.toFixed(decimals)))
  );
  return `${clampedValue}`;
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
  const step = parseFloat(slider.step);
  const moveOffset = {
    ArrowRight: step,
    ArrowDown: -step,
    ArrowLeft: -step,
    ArrowUp: step,
  }[key];
  if (!moveOffset) {
    return;
  }
  const [minFloat, maxFloat, , valueFloat] = parsedToFloat(
    slider.min,
    slider.max,
    slider.step,
    slider.value
  );
  const decimals = slider.step.includes(".")
    ? slider.step.split(".")[1].length
    : 0;

  const clampedValue = Math.max(
    minFloat,
    Math.min(maxFloat, parseFloat((valueFloat + moveOffset).toFixed(decimals)))
  );
  return `${clampedValue}`;
}
