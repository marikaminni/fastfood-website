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
    {
      name: "Sparkling water",
      description: "0.50 L bottle of sparkling water.",
      price: 0.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/acqua-frizz.png",
    },
    {
      name: "Still water",
      description: "0.50 L bottle of still water.",
      price: 0.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/acqua-nat.png",
    },
    {
      name: "Coke",
      description: "0.4L coke.",
      price: 1.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/coca-cola.png",
    },
    {
      name: "Diet Coke",
      description: "0.4L diet coke.",
      price: 1.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/coca-zero.png",
    },
    {
      name: "Sprite",
      description: "0.4L Sprite.",
      price: 1.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/sprite.png",
    },
    {
      name: "Lemon tea",
      description: "0.4L Lemon tea.",
      price: 1.0,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/te-limone.png",
    },
    {
      name: "Peach tea",
      description: "0.4L Peach tea.",
      price: 1.0,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/te-pesca.png",
    },
    {
      name: "Heineken",
      description: "0.5L Heineken.",
      price: 2.0,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/heineken.png",
    },
    {
      name: "Decaffeinated coffee",
      description:
        "Experience the perfection of creamy decaffeineted espresso in a cup.",
      price: 0.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/decaffeinato.png",
    },
    {
      name: "Espresso",
      description: "Experience the perfection of creamy espresso in a cup.",
      price: 0.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/espresso.png",
    },
    {
      name: "Espresso Macchiato",
      description:
        "Experience the perfection of creamy espresso macchiato in a cup.",
      price: 0.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/espresso-macchiato.png",
    },
    {
      name: "Ginseng",
      description:
        "With its smooth, slightly sweet flavor, ginseng coffee is an energizing alternative to traditional coffee, blending the rich benefits of ginseng with a deliciously unique taste.",
      price: 0.5,
      category: "Beverages",
      image: "/immagini/prodotti/bevande/ginseng.png",
    },
    {
      name: "Nuggets",
      description:
        "Delicious chicken nuggets with a crispy and tasty breading. Every bite will be truly unique.",
      price: 2.5,
      category: "Snack",
      image: "/immagini/prodotti/snack/nuggets.png",
    },
    {
      name: "Fries",
      description:
        "Crispy, appetizing and tasty, French fries are a must-have.",
      price: 2.5,
      category: "Snack",
      image: "/immagini/prodotti/snack/fries.png",
    },
    {
      name: "Bacon Fries",
      description: "French fries with cheddar and bacon.",
      price: 3.0,
      category: "Snack",
      image: "/immagini/prodotti/snack/bacon-fries.png",
    },
    {
      name: "Chili Cheese Bites",
      description:
        "Delicious nuggets of melted cheese stuffed with jalapenos covered in a light breading. Take them and enjoy them, one after the other.",
      price: 2.0,
      category: "Snack",
      image: "/immagini/prodotti/snack/chili-cheese.png",
    },
    {
      name: "Chicken Wings",
      description: "With their unique taste, Chicken Wings will conquer you.",
      price: 2.5,
      category: "Snack",
      image: "/immagini/prodotti/snack/wings.png",
    },
    {
      name: "Tasty Snackbox",
      description: "Box with onion rings and nuggets.",
      price: 4.0,
      category: "Snack",
      image: "/immagini/prodotti/snack/tasty-box.png",
    },
    {
      name: "Chicken Snackbox",
      description: "Box with chicken wings and nuggets.",
      price: 4.0,
      category: "Snack",
      image: "/immagini/prodotti/snack/chicken-box.png",
    },
    {
      name: "Friends Snackbox",
      description: "Box with onion rings, chili cheese bites and nuggets.",
      price: 4.5,
      category: "Snack",
      image: "/immagini/prodotti/snack/friends-box.png",
    },
  ];

  for (let item of product) {
    await Product.create(item);
  }
  console.log("Product's table created successfully");
  process.exit();
})();
