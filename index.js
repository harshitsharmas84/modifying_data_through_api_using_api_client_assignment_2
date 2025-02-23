const express = require("express");
const { resolve } = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const MenuItem = require("./models/menuItem");
const menuRoutes = require("./routes/menuRoutes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3010;

connectDB();
app.use(bodyParser.json());
app.use(express.static("static"));

app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
