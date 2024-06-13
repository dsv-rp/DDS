// run `HEADLESS=false SLOW_MO=1000 npm run test:web-components` to run test in non-headless mode

/** @type {import("jest-environment-puppeteer").JestPuppeteerConfig} */
module.exports = {
    launch: {
        headless: process.env.HEADLESS !== "false" && "new", // `"new"` by default, `false` if "false"
        slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : undefined,
    },
    browserContext: 'default',
};
