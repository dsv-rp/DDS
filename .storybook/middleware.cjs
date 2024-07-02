/**
 * @param {import("express").Router} router
 * @returns {void}
 */
const expressIframeRedirectMiddleware = (router) => {
  router.get("/iframe", (req, res) => {
    const query = req.url.replace(/^[^?]+/, "");
    res.redirect(307, `/iframe.html${query}`);
  });
};

module.exports = expressIframeRedirectMiddleware;
