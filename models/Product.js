const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Product;

(async () => {
  await sequelize.sync({ alter: true });
  const product = [
    {
      name: "Steak House Burger",
      description:
        "Beef burger with tomato, salad, mayo, bacon, BBQ sauce, crispy onion, cheddar",
      price: 5.5,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/bronx-steakhouse.png",
    },
    {
      name: "Bacon Bros",
      description:
        "Beef burger with double bacon, double cheese, ketchup, mayo",
      price: 6.5,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/baconking.png",
    },
    {
      name: "Crazy Cheese",
      description:
        "The perfect combination between cheddar sauce and the smoked Bull's Eye BBQ sauce, with crispy onion and bacon",
      price: 5.5,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/crazycheese.png",
    },
    {
      name: "Bacon onion weave",
      description:
        "3 layers of grilled meat, 3 layers of cheese, 6 slices of delicious crispy bacon, and 6 crispy onion rings, with ketchup and mayo. Could it be more delicious?",
      price: 7.5,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/bacononion-weave.png",
    },
    {
      name: "Cheeseburger",
      description:
        "Beef burger with, ketchup, pickled, cheddar and mustard. Simple but good, the burger that never disappoints.",
      price: 4.0,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/cheeseburger.png",
    },
    {
      name: "Big tasty",
      description:
        "Big tasty is here to conqer your palate. Beef burger with cheese, onion, tomatoes, salad and the unique Big tasty sauce.",
      price: 4.5,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/bigtasty.png",
    },
    {
      name: "Parmigiano burger",
      description:
        "A shower of Parmigiano Reggiano PDO over a 150g beef burger with mayo gourmet, bacon, fried onion and arugula.",
      price: 8.0,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/parmigiano-burger.png",
    },
    {
      name: "Spicy burger",
      description:
        "Beef burger with Calabrian chillies, salad, tomatoes, bacon, onion and BBQ sauce.Ready for spicy?.",
      price: 8.0,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/spicy.png",
    },
    {
      name: "Chicken bacon",
      description: "Chicken with crispy breading, bacon, mayo, and ketchup.",
      price: 5.5,
      category: "Chicken",
      image: "/immagini/prodotti/burger pollo/chicken-bacon.png",
    },
    {
      name: "Crazy cheese BBQ",
      description:
        "Crispy chicken cutlet with cheddar sauce and BBQ sauce Bull's eyes, bacon and crispy onion.",
      price: 6.5,
      category: "Chicken",
      image: "/immagini/prodotti/burger pollo/crazycheese-BBQ.png",
    },
    {
      name: "Chicken Royale",
      description:
        "The iconic extra-long sesame bun, with toamtoes, salad, mayo, bacon and cheddar.",
      price: 7.5,
      category: "Chicken",
      image: "/immagini/prodotti/burger pollo/chicken-royale.png",
    },
    {
      name: "Colonel's Burger",
      description:
        "Crispy chicken fillet with double mayo, salad and tomatoes.",
      price: 5.0,
      category: "Chicken",
      image: "/immagini/prodotti/burger pollo/colonel-burger.png",
    },
    {
      name: "Double Kentucky BBQ and Bacon",
      description:
        "When you're so hungry you're seeing double, it's time to try the New Double Kentucky BBQ & Bacon! Dive into the irresistible taste of two fried chicken filets paired with crisp pickles, smoky bacon and BBQ sauce. Hurry in to double up on deliciousness.",
      price: 7.0,
      category: "Chicken",
      image: "/immagini/prodotti/burger pollo/Double-Kentucky.png",
    },
    {
      name: "Texas Burger",
      description:
        "Crispy chicken filet, with fried onion rings, cheddar, bacon, mayo and ketchup .",
      price: 5.5,
      category: "Chicken",
      image: "/immagini/prodotti/burger pollo/texas-burger.png",
    },
  ];

  for (let product of product) {
    await Product.create(product);
  }
  await product.save();
  console.log("Product's table created successfully");
  process.exit();
})();
