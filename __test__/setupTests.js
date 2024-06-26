const { configureToMatchImageSnapshot } = require("jest-image-snapshot");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 100,
  failureThresholdType: "pixel",
});

expect.extend({ toMatchImageSnapshot });

beforeEach(async () => {
  await page.setViewport({
    width: 800,
    height: 600,
    deviceScaleFactor: 1,
  });
});
