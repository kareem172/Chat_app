const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5500;

//#region middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
