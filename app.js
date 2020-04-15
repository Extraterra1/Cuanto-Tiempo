const express = require("express");
const app = express();
const axios = require("axios");
const apiController = require("./controllers/apicontroller");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/", apiController.renderIndex);

app.get("/search", apiController.search);

app.get("/show/:showId", apiController.getLength);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening");
});
