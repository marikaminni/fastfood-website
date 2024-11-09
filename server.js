const { Product } = require("./models/Product.js");
const express = require("express");
const app = express();
const path = require("path");
console.log(Product);
require("dotenv").config({ path: "./config/.env" });
app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.html", { googleMapsApiKey: process.env.MAPS_API_KEY });
});

app.post("/book-table", (req, res) => {
  console.log(req.body);
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server avviato e in ascolto sulla porta ${PORT}`);
});

console.log(process.env.MAPS_API_KEY);
