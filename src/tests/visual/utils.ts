import type {
  ElementHandle,
  PageAssertionsToHaveScreenshotOptions,
} from "@playwright/test";

const MARGIN = 10;

export async function clipFor(
  elementHandle: ElementHandle<HTMLElement | SVGElement>
): Promise<PageAssertionsToHaveScreenshotOptions> {
  await elementHandle.waitForElementState("stable");

  const bBox = await elementHandle.boundingBox();
  if (!bBox) {
    throw new Error("failed to get bounding box");
  }

  const scrollX = await elementHandle.evaluate(() => window.scrollX);
  const scrollY = await elementHandle.evaluate(() => window.scrollY);

  return {
    clip: {
      x: Math.round(bBox.x) - MARGIN + scrollX,
      y: Math.round(bBox.y) - MARGIN + scrollY,
      width: Math.round(bBox.width) + MARGIN * 2,
      height: Math.round(bBox.height) + MARGIN * 2,
    },
    fullPage: true,
  };
}
