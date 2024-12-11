const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const { Products, Orders, Booking, User } = require("./models");
const authRoute = require("./routes/auth.route");
require("dotenv").config({ path: "./config/.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoute);
app.use(cookieParser());
app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.html", { googleMapsApiKey: process.env.MAPS_API_KEY });
});

app.get("/order", (req, res) => {
  res.render("order.html");
});

app.get("/login", (req, res) => {
  res.render("login.html");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.html");
});

//send order
app.post("/order", (req, res) => {
  console.log("Order data received:", req.body);
  try {
    Orders.create({
      date: Date.now(),
      items: JSON.stringify(req.body.productlist),
      total: JSON.stringify(req.body.total),
      status: "ordered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore nel salvataggio dell'ordine" });
  }
  res.json({ message: "Order successfully" });
});

//get orders
app.get("/orders", async (req, res) => {
  try {
    const products = await Orders.findAll({});
    return res.json(products);
  } catch (error) {
    console.error("Errore nel recupero degli ordini:", error);
    // Verifica se le intestazioni non sono già state inviate
    if (!res.headersSent) {
      res.status(500).send("Errore nel recupero degli ordini");
    }
  }
});

//Update orders status
app.patch("/orders", async (req, res) => {
  const id = req.query.id;
  const newStatus = req.body.status;
  try {
    await Orders.update(
      {
        status: newStatus,
      },
      {
        where: { id: id },
      }
    );
    return res.json({ message: "Order updated" });
  } catch (error) {
    console.error("Error unable to update order:", error);
    if (!res.headersSent) {
      res.status(500).send("Errore nell'aggiornamento degli ordini");
    }
  }
});

//Delete orders
app.delete("/orders", async (req, res) => {
  const id = req.query.id;
  try {
    await Orders.destroy({
      where: { id: id },
    });
    return res.json({ message: "Order delete" });
  } catch (error) {
    console.error("Errore nell'eliminazione dell'ordine:", error);
    if (!res.headersSent) {
      res.status(500).send("Errore nell'eliminazione dell'ordine");
    }
  }
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

//Book table
app.post("/book-table", (req, res) => {
  //const { name, phone, date, guests, message } = req.body;
  console.log("Booking data received:", req.body);
  try {
    Booking.create({
      name: req.body.name,
      phone: req.body.phone,
      date: req.body.date,
      guest: req.body.guests,
      message: req.body.message,
    });
    res.json({ message: "Booking successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore nel salvataggio della prenotazione" });
  }
});

//Get bookings
app.get("/book-table", async (req, res) => {
  try {
    const bookings = await Booking.findAll({});
    return res.json(bookings);
  } catch (error) {
    console.error("Errore nel recupero delle prenotazioni:", error);
    if (!res.headersSent) {
      res.status(500).send("Errore nel recupero delle prenotazioni");
    }
  }
});

//Delete bookings
app.delete("/book-table", async (req, res) => {
  const id = req.query.id;
  try {
    await Booking.destroy({
      where: { id: id },
    });
    return res.json({ message: "Booking delete" });
  } catch (error) {
    console.error("Errore nell'eliminazione della prenotazione:", error);
    if (!res.headersSent) {
      res.status(500).send("Errore nell'eliminazione della prenotazione");
    }
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server avviato e in ascolto sulla porta ${PORT}`);
});
