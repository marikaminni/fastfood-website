const express = require("express");
const app = express();
const path = require("path");
const { Products } = require("./models");

require("dotenv").config({ path: "./config/.env" });
app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.html", { googleMapsApiKey: process.env.MAPS_API_KEY });
});

//Retriveve product from db
app.get("/products", async (req, res) => {
  const category = req.query.category;
  try {
    const products = await Products.findAll({ where: { category } });
    //console.log("Prodotti trovati:", JSON.stringify(products, null, 2));
    return res.json(products);
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error); // Log dell'errore dettagliato
    // Verifica se le intestazioni non sono già state inviate
    if (!res.headersSent) {
      res.status(500).send("Errore nel recupero dei prodotti");
    }
  }
});

app.post("/book-table", (req, res) => {
  console.log(req.body);
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server avviato e in ascolto sulla porta ${PORT}`);
});
