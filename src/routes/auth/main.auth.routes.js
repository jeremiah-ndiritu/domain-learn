const { db } = require("../../config/db");
const path = require("path");
const express = require("express");
/**
 *
 * @param {import('express').Express} app
 */
module.exports = (app) => {
  app.use(express.json());
  app.get("/register", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "apps", "auth", "register.html")
    );
  });
  app.get("/login", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "apps", "auth", "login.html")
    );
  });
  app.post("/login/:user", async (req, res) => {
    let { user } = req.params;
    user = JSON.parse(user);
    const { email, password } = user;
    if (!user) {
      return res
        .status(300)
        .json({ message: "Login credentials were not provided!" });
    }
    const [users] = await db.query("SELECT * FROM users WHERE email =?", [
      email,
    ]);
    console.log("users :>> ", users);
    if (!users || users.length === 0) {
      return res
        .status(300)
        .json({ message: "User with that email not found!" });
    }
    if (users[0].password === password) {
      console.log("user logged in :>> ", users[0]);
      return res
        .status(200)
        .json({ message: "Successful login!", user: users[0] });
    }
    res.json({ message: "It reached me HUHU!!!" });
  });
  app.post("/register/:user", async (req, res) => {
    let { user } = req.params;
    user = JSON.parse(user);
    const { name, username, email, password } = user;
    const query =
      "INSERT INTO users(fullname, username, email, password) VALUES(?,?,?,?)";
    const [result] = await db.query(query, [name, username, email, password]);
    console.log("result :>> ", result);
    res.json({ message: "It reached my end 😂😁" });
  });
};
