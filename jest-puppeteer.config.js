// Ddd this code to improve chrome browser rendering performance when test
module.exports = {
  launch: {
    product: "firefox",
    args: ['-wait-for-browser'],
    defaultViewport: { width: 800, height: 600 },
  },
  browserContext: "default",
};
