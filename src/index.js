const express = require("express");
const cors = require("cors");
const path = require("path");
const { testDB } = require("./config/db");

const port = process.env.PORT || 5010;
const app = express(); // call it domain-learn
app.set("subdomain offset", 2);
const DOMAIN = `http://domain-learn.localhost:${port}`;
app.use(cors());
app.use(express.json());

const mountSubApp = (subdomain = "www", folder = "www") => {
  const subApp = express();
  subApp.use(express.json());
  subApp.use(express.static(path.join(__dirname, "apps", folder)));
  const routes = require(`./routes/${folder}/main.${folder}.routes`);
  routes(subApp);
  app.use((req, res, next) => {
    if (req.subdomains[0] === subdomain || (!subdomain && !req.subdomains[0])) {
      subApp(req, res, next);
    } else {
      next();
    }
  });
};

mountSubApp("", "www");
mountSubApp("library", "library");
mountSubApp("www", "www");
mountSubApp("blog", "blog");
mountSubApp("help", "help");
mountSubApp("auth", "auth");

(async () => {
  await testDB();
  app.listen(port, () => {
    console.log(`Server is live at ${DOMAIN}`);
  });
})();

module.exports = app;
