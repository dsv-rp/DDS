// Ddd this code to improve chrome browser rendering performance when test
module.exports = {
  launch: {
    headless: "new",
    defaultViewport: { width: 800, height: 600 },
    args: [],
  },
  browserContext: "default",
};
