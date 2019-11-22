const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(8888, () => {
  console.log("Running express");
});
