// Ddd this code to improve chrome browser rendering performance when test
module.exports = {
  launch: {
    headless: "new",
    defaultViewport: { width: 800, height: 600 },
    args: [
      "--disable-gpu",
      "--disable-gpu-compositng",
      "--disable-accelerated-2d-canvas",
      "--disable-use-zoom-for-dsf",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--enable-fontations-backend",
      "--font-render-hinting=none",
      "--disable-font-subpixel-positioning",
      "--disable-lcd-text",
      "--force-color-profile=srgb",
    ],
  },
  browserContext: "default",
};
