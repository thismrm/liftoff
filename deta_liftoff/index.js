require("dotenv").config();
const express = require("express");
const app = express();
const { Deta } = require("deta");

// deta setup
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base(process.env.PROJECT_DB);
// deta setup

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.render("index", {
    email: false,
  })
);

app.post("/success", async (req, res) => {
  await db.put({ email: req.body.email });
  res.render("index", { email: true });
});

if (process.env.DETA_RUNTIME === "true") {
  module.exports = app;
} else {
  app.listen(3000, () => console.log("running on local server"));
}
