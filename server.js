const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SCOREX Server is running!");
});

app.listen(3000, () => {
  console.log("SCOREX is running");
});
