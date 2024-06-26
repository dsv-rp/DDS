const { configureToMatchImageSnapshot } = require("jest-image-snapshot");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.1, // 10%, very large value; this will be changed after we run VRTs in a container
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
