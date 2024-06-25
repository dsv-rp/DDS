// Ddd this code to improve chrome browser rendering performance when test
module.exports = {
  launch: {
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
    ],
  },
  browserContext: "default",
};
