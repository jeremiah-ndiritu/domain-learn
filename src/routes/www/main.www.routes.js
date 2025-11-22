const topics = [
  {
    id: 1,
    title: "How domains work",
    link: "http://blog.domain-learn.localhost:5010/api/blogs/1",
    overview: `You will learn what domains are and how they work. Domains are ...`,
  },
  {
    id: 2,
    title: "Subdomains",
    link: "http://blog.domain-learn.localhost:5010/api/blogs/2",
    overview: `What are subdomains? These are like sub names of the...`,
  },
  {
    id: 3,
    title: "Top Level Domains (TLDs)",
    link: "http://blog.domain-learn.localhost:5010/api/blogs/3",
    overview: `What is a top level domain. A TLD is a name that...`,
  },
  {
    id: 4,
    title: "Routing domains",
    link: "http://blog.domain-learn.localhost:5010/api/blogs/4",
    overview: `You will learn how to route domains. Routing includes...`,
  },

  {
    id: 5,
    title: "Owning a domain",
    link: "http://blog.domain-learn.localhost:5010/api/blogs/5",
    overview: `To own a domain for your site, you need to purchase one from...`,
  },
  {
    id: 6,
    title:
      "How Tech companies like Google, Microsoft use domains and subdomains for their ecosystems",
    link: "http://blog.domain-learn.localhost:5010/api/blogs/6",
    overview: `Let's take a look at these giant tech companies in our world. First their domain names are...`,
  },
];
const path = require("path");

/**
 *
 * @param {import('express').Express} app
 */
module.exports = (app) => {
  app.get("/topics", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "apps", "www", `topics.html`)
    );
  });
  app.get("/api/topics", (req, res) => {
    res.json(topics);
  });
  app.get("/auth/:action", (req, res) => {
    const { action } = req.params;
    const allowedActions = ["login", "register"];
    if (!allowedActions.includes(action.toLowerCase())) {
      return res.send(
        `<h1>Action "${action}" is not allowed!</h1>
          <p>please visit <a href="http://help.domain-learn.localhost:5010">help</a> page or go to <a href='http://www.domain-learn.localhost:5010/'>home</a></p>
        `
      );
    }
    res.send(`<h1> You want to ${action}</h1>`);
  });
};
