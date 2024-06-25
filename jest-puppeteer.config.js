// Ddd this code to improve chrome browser rendering performance when test
module.exports = {
  launch: {
    headless: true,
    defaultViewport: { width: 800, height: 600 },
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--font-render-hinting=none",
      "--disable-font-subpixel-positioning",
      "--disable-lcd-text",
    ],
  },
  browserContext: "default",
};
