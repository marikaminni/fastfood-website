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
      name: "Bacon King",
      description:
        "Beef burger with double bacon, double cheese, ketchup, mayo",
      price: 6.5,
      category: "Beef",
      image: "/immagini/prodotti/burger manzo/baconking.png",
    },
  ];

  for (let product of product) {
    await Product.create(product);
  }
  await product.save();
  console.log("Product's table created successfully");
  process.exit();
})();
