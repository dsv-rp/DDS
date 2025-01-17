import { describe, it } from "vitest";
import { DaikinSlider } from "./daikin-slider";
import {
  getValueAndProgressFromCoordinate,
  getValueAndProgressFromKeyboard,
  parsedToFloat,
} from "./slider-utils";

describe("test parsedToFloat function", () => {
  it("min: '1'; max: '100'; step: '1'; value: '50'", ({ expect }) => {
    const [min, max, step, value] = parsedToFloat("1", "100", "2", "50");
    expect(min).toEqual(1);
    expect(max).toEqual(100);
    expect(step).toEqual(2);
    expect(value).toEqual(50);
  });

  it("min: '1'; max: '100'; step: '0.01'; value: '50'", ({ expect }) => {
    const [min, max, step, value] = parsedToFloat("1", "100", "0.01", "50");
    expect(min).toEqual(1);
    expect(max).toEqual(100);
    expect(step).toEqual(0.01);
    expect(value).toEqual(50);
  });

  it("min: '1'; max: '100'; step: '0.01000'; value: '50'", ({ expect }) => {
    const [min, max, step, value] = parsedToFloat("1", "100", "0.01", "50");
    expect(min).toEqual(1);
    expect(max).toEqual(100);
    expect(step).toEqual(0.01);
    expect(value).toEqual(50);
  });

  it("min: '1'; max: '100'; step: '0.010001'; value: '50'", ({ expect }) => {
    const [min, max, step, value] = parsedToFloat("1", "100", "0.010001", "50");
    expect(min).toEqual(1);
    expect(max).toEqual(100);
    expect(step).toEqual(0.010001);
    expect(value).toEqual(50);
  });
});

describe("test getValueAndProgressFromCoordinate function", () => {
  it("min: '0'; max: '100'; step: '1'; leftDistance: 0.5", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 0.5);
    expect(value).toEqual("50");
    expect(progress).toEqual(50);
  });

  it("min: '0'; max: '100'; step: '1'; leftDistance: 0", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 0);
    expect(value).toEqual("0");
    expect(progress).toEqual(0);
  });

  it("min: '1'; max: '100'; step: '1'; leftDistance: 0", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "100";
    slider.step = "1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 0);
    expect(value).toEqual("1");
    expect(progress).toEqual(0);
  });

  it("min: '1'; max: '100'; step: '1'; leftDistance: 1", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "100";
    slider.step = "1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 1);
    expect(value).toEqual("100");
    expect(progress).toEqual(100);
  });

  it("min: '0'; max: '10'; step: '1'; leftDistance: 0.2", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 0.2);
    expect(value).toEqual("2");
    expect(progress).toEqual(20);
  });

  it("min: '0'; max: '10'; step: '0.1'; leftDistance: 0.2", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "0.1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 0.2);
    expect(value).toEqual("2");
    expect(progress).toEqual(20);
  });

  it("min: '0'; max: '10'; step: '0.1'; leftDistance: 0.21", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "0.1";
    const [value, progress] = getValueAndProgressFromCoordinate(slider, 0.21);
    expect(value).toEqual("2.1");
    expect(progress).toBeCloseTo(21, 2);
  });
});

describe("test getValueAndProgressFromKeyboard function", () => {
  it("min: '0'; max: '10'; step: '1'; value: '4'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.value = "4";
    slider.step = "1";

    const [value, progress] = getValueAndProgressFromKeyboard(slider, 1);
    expect(value).toEqual("5");
    expect(progress).toEqual(50);
  });

  it("min: '0'; max: '10'; step: '1'; value: '6'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.value = "6";
    slider.step = "1";

    const [value, progress] = getValueAndProgressFromKeyboard(slider, -1);
    expect(value).toEqual("5");
    expect(progress).toEqual(50);
  });

  it("min: '1'; max: '10'; step: '1'; value: '1'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "1";
    slider.step = "1";

    const [value, progress] = getValueAndProgressFromKeyboard(slider, -1);
    expect(value).toEqual("1");
    expect(progress).toEqual(0);
  });

  it("min: '1'; max: '10'; step: '1'; value: '10'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "10";
    slider.step = "1";

    const [value, progress] = getValueAndProgressFromKeyboard(slider, 1);
    expect(value).toEqual("10");
    expect(progress).toEqual(100);
  });

  it("min: '1'; max: '10'; step: '1'; value: '8'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "8";
    slider.step = "1";

    const [value, progress] = getValueAndProgressFromKeyboard(slider, 1);
    expect(value).toEqual("9");
    expect(progress).toEqual(88.88888888888889);
  });
});
