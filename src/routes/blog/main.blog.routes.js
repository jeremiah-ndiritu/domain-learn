const path = require("path");
/**
 *
 * @param {import('express').Express} app
 */
module.exports = function (app) {
  app.get("/blogger", (req, res) => {
    res.send("<h1>Blogs Blogger: Jeremiah Ndiritu</h1>");
  });
  app.get("/founders", (req, res) => {
    res.send(`
            <h2>Founders</h2>
            <div>
                <ol>
                    <li>Jeremiah Ndiritu</li>
                    <li>Mary M Kimani</li>
                    <li>Joseph FX</li>
                </ol>
            </div>        
        `);
  });
  app.get("/api/blogs/:id", (req, res) => {
    const { id } = req.params;

    res.sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "apps",
        "blog",
        "blogs",
        `blog-${id}.html`
      )
    );
  });
};
