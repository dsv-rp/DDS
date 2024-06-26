// Ddd this code to improve chrome browser rendering performance when test
module.exports = {
  launch: {
    headless: "new",
    defaultViewport: { width: 800, height: 600 },
    args: [
      "--enable-gpu-rasterization",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--font-render-hinting=none",
      "--disable-lcd-text",
      "--force-color-profile=srgb",
    ],
  },
  browserContext: "default",
};
