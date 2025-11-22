/**
 *
 * @param {import('express').Express} app
 */
module.exports = function (app) {
  app.get("/catalogue", (req, res) => {
    res.send("<h1>Library Catalogue</h1>");
  });
};
