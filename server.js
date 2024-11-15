const express = require("express");
const app = express();
const path = require("path");
const { Products } = require("./models");
require("dotenv").config({ path: "./config/.env" });

app.use(express.json());
app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.html", { googleMapsApiKey: process.env.MAPS_API_KEY });
});

//Retrieve product from db
app.get("/products", async (req, res) => {
  const category = req.query.category;
  try {
    const products = await Products.findAll({ where: { category } });
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
  //const { name, phone, date, guests, message } = req.body;
  console.log("Booking data received:", req.body);

  res.json({ message: "Booking successfully" });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server avviato e in ascolto sulla porta ${PORT}`);
});
