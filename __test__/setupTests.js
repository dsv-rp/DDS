const { configureToMatchImageSnapshot } = require("jest-image-snapshot");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  // We'll change this back to pixelmatch after we setup a container for running VRTs.
  comparisonMethod: 'ssim',
  failureThreshold: 0.01,
  failureThresholdType: "percent",
});

expect.extend({ toMatchImageSnapshot });

beforeEach(async () => {
  await page.setViewport({
    width: 800,
    height: 600,
    deviceScaleFactor: 1,
  });
});
