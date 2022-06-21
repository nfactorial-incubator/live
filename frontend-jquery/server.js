const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("*", function (req, res) {
  res.header("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT || 1337);
