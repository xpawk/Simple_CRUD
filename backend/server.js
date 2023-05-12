const express = require("express");
const path = require("path");
const dbActions = require("./dbActions.js");
const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dbActions(app);

app.use(
  "/static",
  express.static(path.resolve(__dirname, "../frontend", "static"))
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.listen(3000, () => console.log("Server running..."));
