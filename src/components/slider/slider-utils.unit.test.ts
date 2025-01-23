import { describe, it } from "vitest";
import { DaikinSlider } from "./daikin-slider";
import { getValueByKeydown, getValueFromRatio } from "./slider-utils";

describe("test getValueFromRatio function", () => {
  it("min: '0'; max: '100'; step: '1'; leftDistance: 0.5", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    const value = getValueFromRatio(slider, 0.5);
    expect(value).toEqual("50");
  });

  it("min: '0'; max: '100'; step: '1'; leftDistance: 0", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    const value = getValueFromRatio(slider, 0);
    expect(value).toEqual("0");
  });

  it("min: '1'; max: '100'; step: '1'; leftDistance: 0", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "100";
    slider.step = "1";
    const value = getValueFromRatio(slider, 0);
    expect(value).toEqual("1");
  });

  it("min: '1'; max: '100'; step: '1'; leftDistance: 1", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "100";
    slider.step = "1";
    const value = getValueFromRatio(slider, 1);
    expect(value).toEqual("100");
  });

  it("min: '0'; max: '10'; step: '1'; leftDistance: 0.2", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "1";
    const value = getValueFromRatio(slider, 0.2);
    expect(value).toEqual("2");
  });

  it("min: '0'; max: '10'; step: '0.1'; leftDistance: 0.2", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "0.1";
    const value = getValueFromRatio(slider, 0.2);
    expect(value).toEqual("2");
  });

  it("min: '0'; max: '10'; step: '0.1'; leftDistance: 0.21", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "0.1";
    const value = getValueFromRatio(slider, 0.21);
    expect(value).toEqual("2.1");
  });

  it("min: '0'; max: '10'; step: '0.01000'; leftDistance: 0.5", ({
    expect,
  }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "0.01000";
    const value = getValueFromRatio(slider, 0.5);
    expect(value).toEqual("5");
  });

  it("min: '0'; max: '10'; step: '0.01001'; leftDistance: 0.5", ({
    expect,
  }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.step = "0.01001";
    const value = getValueFromRatio(slider, 0.5);
    expect(value).toEqual("5.005");
  });
});

describe("test getValueByKeydown function", () => {
  it("min: '0'; max: '10'; step: '1'; value: '4'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.value = "4";
    slider.step = "1";

    const value = getValueByKeydown(slider, "ArrowRight");
    expect(value).toEqual("5");
  });

  it("min: '0'; max: '10'; step: '1'; value: '6'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "0";
    slider.max = "10";
    slider.value = "6";
    slider.step = "1";

    const value = getValueByKeydown(slider, "ArrowLeft");
    expect(value).toEqual("5");
  });

  it("min: '1'; max: '10'; step: '1'; value: '1'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "1";
    slider.step = "1";

    const value = getValueByKeydown(slider, "ArrowDown");
    expect(value).toEqual("1");
  });

  it("min: '1'; max: '10'; step: '1'; value: '10'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "10";
    slider.step = "1";

    const value = getValueByKeydown(slider, "ArrowUp");
    expect(value).toEqual("10");
  });

  it("min: '1'; max: '10'; step: '1'; value: '8'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "8";
    slider.step = "1";

    const value = getValueByKeydown(slider, "ArrowRight");
    expect(value).toEqual("9");
  });

  it("min: '1'; max: '10'; step: '0.01000'; value: '8'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "8";
    slider.step = "0.01000";

    const value = getValueByKeydown(slider, "ArrowRight");
    expect(value).toEqual("8.01");
  });

  it("min: '1'; max: '10'; step: '0.01001'; value: '8'", ({ expect }) => {
    const slider = new DaikinSlider();
    slider.min = "1";
    slider.max = "10";
    slider.value = "8";
    slider.step = "0.01001";

    const value = getValueByKeydown(slider, "ArrowRight");
    expect(value).toEqual("8.01001");
  });
});
