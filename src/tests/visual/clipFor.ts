import type {
  ElementHandle,
  PageAssertionsToHaveScreenshotOptions,
} from "@playwright/test";
import { SCREENSHOT_ELEMENT_MARGIN } from "./config";

export async function clipFor(
  elementHandle: ElementHandle<HTMLElement | SVGElement>
): Promise<PageAssertionsToHaveScreenshotOptions> {
  await elementHandle.waitForElementState("stable");

  const bBox = await elementHandle.boundingBox();
  if (!bBox) {
    throw new Error("failed to get bounding box");
  }

  const [scrollX, scrollY] = await elementHandle.evaluate(() => [
    window.scrollX,
    window.scrollY,
  ]);

  return {
    clip: {
      x: Math.round(bBox.x) - SCREENSHOT_ELEMENT_MARGIN + scrollX,
      y: Math.round(bBox.y) - SCREENSHOT_ELEMENT_MARGIN + scrollY,
      width: Math.round(bBox.width) + SCREENSHOT_ELEMENT_MARGIN * 2,
      height: Math.round(bBox.height) + SCREENSHOT_ELEMENT_MARGIN * 2,
    },
    fullPage: true,
  };
}
