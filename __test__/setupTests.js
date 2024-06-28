const { configureToMatchImageSnapshot } = require("jest-image-snapshot");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
    // I have tried set blur to 1 to solve the problem that there are some noise appear in my snapshot
    // it's better to set blur default
    blur: 0
});

expect.extend({ toMatchImageSnapshot });

beforeEach( async() => {
    await page.setViewport({
        width: 800,
        height: 600,
        deviceScaleFactor: 1
    });
})
