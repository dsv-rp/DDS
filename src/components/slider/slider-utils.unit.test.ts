import { describe, expect, it } from "vitest";
import { DaikinSlider } from "./daikin-slider";
import {
  formatValue,
  getValueByKeydown,
  getValueFromRatio,
  normalizeNumberString,
} from "./slider-utils";

describe("test normalizeNumberString function", () => {
  it.each([
    ["1.1000", "1.1"],
    ["1.00", "1"],
    ["0.0", "0"],
    ["1.230", "1.23"],
    ["1.0001", "1.0001"],
    ["1.00010", "1.0001"],
    ["1", "1"],
    ["100", "100"],
    ["0.001", "0.001"],
    ["0.0010", "0.001"],
    ["10.10010", "10.1001"],
    ["10.1001", "10.1001"],
    ["0", "0"],
    ["-0", "0"],
    ["-00.0", "0"],
    ["001.0", "1"],
    ["-001.0", "-1"],
    ["000100.0000", "100"],
    ["-000100.0000", "-100"],
  ])("str: %s; result: %s", (str: string, expected: string) => {
    const result = normalizeNumberString(str);
    expect(result).toEqual(expected);
  });
});

describe("test formatValue function", () => {
  it.each([
    [1.000001, "0.2", "1"],
    [1.001, "0.002", "1.001"],
    [1.00001, "0.02000", "1"],
  ])(
    "value: %i; step: %s; result: %s",
    (value: number, step: string, expected: string) => {
      const result = formatValue(value, step);
      expect(result).toEqual(expected);
    }
  );

  it.each([
    [1000, "1", "1000"],
    [1000, "9", "1000"],
    [1000, "100", "1000"],
    [1000, "0.002", "1000"],
    [1001, "1", "1001"],
    [1001, "9", "1001"],
    [1001, "100", "1001"],
    [1001, "0.002", "1001"],
    [2000, "1.0000", "2000"],
  ])(
    "value: %i; step: %s; result: %s",
    (value: number, step: string, expected: string) => {
      const result = formatValue(value, step);
      expect(result).toEqual(expected);
    }
  );
});

describe("test getValueFromRatio function", () => {
  it.each([
    ["0", "100", "1", 0.5, "50"],
    ["0", "100", "1", 0, "0"],
    ["1", "100", "1", 0, "1"],
    ["1", "100", "1", 1, "100"],
    ["0", "10", "1", 0.2, "2"],
    ["0", "10", "0.1", 0.2, "2"],
    ["0", "10", "0.1", 0.21, "2.1"],
    ["0", "10", "0.01000", 0.5, "5"],
    ["0", "10", "0.01001", 0.5, "5.005"],
    ["0", "9.9", "1", 1, "9.9"], // Max not aligned with step
    ["0", "5.005", "0.01", 1, "5.005"], // Small step, trailing decimals
    ["0", "10", "0.3", 0.999, "9.9"], // Near max with step mismatch
  ])(
    "min: %i; max: %s; step: %s; leftDistance: %i; result: %s",
    (
      min: string,
      max: string,
      step: string,
      leftDistance: number,
      result: string
    ) => {
      const slider = new DaikinSlider();
      slider.min = min;
      slider.max = max;
      slider.step = step;
      expect(getValueFromRatio(slider, leftDistance)).toEqual(result);
    }
  );
});

describe("test getValueByKeydown function", () => {
  it.each([
    ["0", "10", "1", "4", "ArrowRight", "5"],
    ["0", "10", "1", "6", "ArrowLeft", "5"],
    ["1", "10", "1", "1", "ArrowDown", "1"],
    ["1", "10", "1", "10", "ArrowUp", "10"],
    ["1", "10", "1", "8", "ArrowRight", "9"],
    ["1", "10", "0.01000", "8", "ArrowRight", "8.01"],
    ["1", "10", "0.01001", "8", "ArrowRight", "8.01001"],
    ["0", "10", "1", "5", "Home", "0"],
    ["0", "10", "1", "5", "End", "10"],
    ["1", "10", "0.01001", "8", "ArrowRight", "8.01001"],
    ["0", "10", "1", "5", "Home", "0"],
    ["0", "10", "1", "5", "End", "10"],
    ["0", "10", "1", "5", "PageDown", "0"],
    ["0", "10", "1", "0", "PageDown", "0"],
    ["0", "100", "1", "50", "PageDown", "40"],
    ["0", "10", "1", "5", "PageUp", "10"],
    ["0", "10", "1", "10", "PageUp", "10"],
    ["0", "100", "1", "50", "PageUp", "60"],
  ])(
    "min: %i; max: %s; value: %s; step: %s; key: %s; result: %s",
    (
      min: string,
      max: string,
      step: string,
      value: string,
      key: string,
      result: string
    ) => {
      const slider = new DaikinSlider();
      slider.min = min;
      slider.max = max;
      slider.value = value;
      slider.step = step;
      expect(getValueByKeydown(slider, key)).toEqual(result);
    }
  );
});
