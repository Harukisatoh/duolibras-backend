const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `API running on 'http://${process.env.HOST}:${process.env.PORT}'.`
  );
});
