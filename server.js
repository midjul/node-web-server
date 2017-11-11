const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});
/*app.use((req, res, next) => {
  res.render("maintenance.hbs");
});
*/
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to root page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});
app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Page",
    projects: ["First Project", "Second Project", "Third Project"]
  });
});
app.get("/bad", (req, res) => {
  res.json({ error: "Unable to  handle request" });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
