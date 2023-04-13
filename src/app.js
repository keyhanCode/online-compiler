const path = require("path");
const express = require("express");
const hbs = require("hbs");
const creatFile = require("./utils/main");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicDirectoyPath = path.join(__dirname, "../");
const viewsPath = path.join(__dirname, "../templates/views");

app.use(express.static(publicDirectoyPath));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("", (req, res) => {
  res.render("index.hbs", {
    headTitle: "Weather forecast app",
  });
});

app.post("/submit-text", (req, res) => {
  const userText = req.body.code;
  creatFile(userText, (error, respons) => {
    res.send({
      error: error,
      respons: respons,
    });
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
