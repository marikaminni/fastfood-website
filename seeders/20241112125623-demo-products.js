"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Steak House Burger",
          description:
            "Beef burger with tomato, salad, mayo, bacon, BBQ sauce, crispy onion, cheddar",
          price: 5.5,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/bronx-steakhouse.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bacon Bros",
          description:
            "Beef burger with double bacon, double cheese, ketchup, mayo",
          price: 6.5,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/baconking.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Crazy Cheese",
          description:
            "The perfect combination between cheddar sauce and the smoked Bull's Eye BBQ sauce, with crispy onion and bacon",
          price: 5.5,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/crazycheese.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bacon onion weave",
          description:
            "3 layers of grilled meat, 3 layers of cheese, 6 slices of delicious crispy bacon, and 6 crispy onion rings, with ketchup and mayo. Could it be more delicious?",
          price: 7.5,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/bacononion-weave.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cheeseburger",
          description:
            "Beef burger with, ketchup, pickled, cheddar and mustard. Simple but good, the burger that never disappoints.",
          price: 4.0,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/cheeseburger.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Big tasty",
          description:
            "Big tasty is here to conqer your palate. Beef burger with cheese, onion, tomatoes, salad and the unique Big tasty sauce.",
          price: 4.5,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/bigtasty.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Parmigiano burger",
          description:
            "A shower of Parmigiano Reggiano PDO over a 150g beef burger with mayo gourmet, bacon, fried onion and arugula.",
          price: 8.0,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/parmigiano-burger.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Spicy burger",
          description:
            "Beef burger with Calabrian chillies, salad, tomatoes, bacon, onion and BBQ sauce.Ready for spicy?.",
          price: 8.0,
          category: "Beef",
          image: "/immagini/prodotti/burger manzo/spicy.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chicken bacon",
          description:
            "Chicken with crispy breading, bacon, mayo, and ketchup.",
          price: 5.5,
          category: "Chicken",
          image: "/immagini/prodotti/burger pollo/chicken-bacon.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Crazy cheese BBQ",
          description:
            "Crispy chicken cutlet with cheddar sauce and BBQ sauce Bull's eyes, bacon and crispy onion.",
          price: 6.5,
          category: "Chicken",
          image: "/immagini/prodotti/burger pollo/crazycheese-BBQ.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chicken Royale",
          description:
            "The iconic extra-long sesame bun, with toamtoes, salad, mayo, bacon and cheddar.",
          price: 7.5,
          category: "Chicken",
          image: "/immagini/prodotti/burger pollo/chicken-royale.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Colonel's Burger",
          description:
            "Crispy chicken fillet with double mayo, salad and tomatoes.",
          price: 5.0,
          category: "Chicken",
          image: "/immagini/prodotti/burger pollo/colonel-burger.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Double Kentucky BBQ and Bacon",
          description:
            "When you're so hungry you're seeing double, it's time to try the New Double Kentucky BBQ & Bacon! Dive into the irresistible taste of two fried chicken filets paired with pickles, smoky bacon and BBQ sauce. Hurry in to double up on deliciousness.",
          price: 7.0,
          category: "Chicken",
          image: "/immagini/prodotti/burger pollo/Double-Kentucky.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Texas Burger",
          description:
            "Crispy chicken filet, with fried onion rings, cheddar, bacon, mayo and ketchup .",
          price: 5.5,
          category: "Chicken",
          image: "/immagini/prodotti/burger pollo/texas-burger.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sparkling water",
          description: "0.50 L bottle of sparkling water.",
          price: 0.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/acqua-frizz.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Still water",
          description: "0.50 L bottle of still water.",
          price: 0.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/acqua-nat.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Coke",
          description: "0.4L coke.",
          price: 1.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/coca-cola.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Diet Coke",
          description: "0.4L diet coke.",
          price: 1.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/coca-zero.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sprite",
          description: "0.4L Sprite.",
          price: 1.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/sprite.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Lemon tea",
          description: "0.4L Lemon tea.",
          price: 1.0,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/te-limone.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Peach tea",
          description: "0.4L Peach tea.",
          price: 1.0,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/te-pesca.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Heineken",
          description: "0.5L Heineken.",
          price: 2.0,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/heineken.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Decaffeinated coffee",
          description:
            "Experience the perfection of creamy decaffeineted espresso in a cup.",
          price: 0.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/decaffeinato.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Espresso",
          description: "Experience the perfection of creamy espresso in a cup.",
          price: 0.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/espresso.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Espresso Macchiato",
          description:
            "Experience the perfection of creamy espresso macchiato in a cup.",
          price: 0.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/espresso-macchiato.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ginseng",
          description:
            "With its smooth, slightly sweet flavor, ginseng coffee is an energizing alternative to traditional coffee, blending the rich benefits of ginseng with a deliciously unique taste.",
          price: 0.5,
          category: "Beverages",
          image: "/immagini/prodotti/bevande/ginseng.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Nuggets",
          description:
            "Delicious chicken nuggets with a crispy and tasty breading. Every bite will be truly unique.",
          price: 2.5,
          category: "Snack",
          image: "/immagini/prodotti/snack/nuggets.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fries",
          description:
            "Crispy, appetizing and tasty, French fries are a must-have.",
          price: 2.5,
          category: "Snack",
          image: "/immagini/prodotti/snack/fries.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bacon Fries",
          description: "French fries with cheddar and bacon.",
          price: 3.0,
          category: "Snack",
          image: "/immagini/prodotti/snack/bacon-fries.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chili Cheese Bites",
          description:
            "Delicious nuggets of melted cheese stuffed with jalapenos covered in a light breading. Take them and enjoy them, one after the other.",
          price: 2.0,
          category: "Snack",
          image: "/immagini/prodotti/snack/chili-cheese.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chicken Wings",
          description:
            "With their unique taste, Chicken Wings will conquer you.",
          price: 2.5,
          category: "Snack",
          image: "/immagini/prodotti/snack/wings.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tasty Snackbox",
          description: "Box with onion rings and nuggets.",
          price: 4.0,
          category: "Snack",
          image: "/immagini/prodotti/snack/tasty-box.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chicken Snackbox",
          description: "Box with chicken wings and nuggets.",
          price: 4.0,
          category: "Snack",
          image: "/immagini/prodotti/snack/chicken-box.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Friends Snackbox",
          description: "Box with onion rings, chili cheese bites and nuggets.",
          price: 4.5,
          category: "Snack",
          image: "/immagini/prodotti/snack/friends-box.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fusion Nutella",
          description:
            "Vanilla ice cream with nutella topping and digestive crumble.",
          price: 1.49,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/fusion-nutella.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fusion Perugina",
          description: "Vanilla ice cream with chocolate pralines.",
          price: 1.49,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/fusion-perugina.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fusion Oreo",
          description: "Vanilla ice cream with oreo cookies.",
          price: 1.49,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/fusion-oreo.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Nesquik Milkshake",
          description: "Nesquik-flavored milkshake.",
          price: 2.0,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/nesquik.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Nescafe Milkshake",
          description: "Nescafe-flavored milkshake.",
          price: 2.0,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/nescafe.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Oreo Milkshake",
          description: "Oreo-flavored milkshake.",
          price: 2.0,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/oreo.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "New York Cheesecake",
          description: "Original NY cheesecake with chocolate topping.",
          price: 1.5,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/ny-cheesecake.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Red Velvet Cake",
          description: "Red Velvet Cake.",
          price: 1.5,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/redvelvet-cake.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Caramel Soufflè with Gelato",
          description:
            "Chocolate soufflè with salted caramel heart and ice cream topping.",
          price: 1.5,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/caramel-gelato-souffle.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Caramel Soufflè",
          description: "Chocolate soufflè with salted caramel heart.",
          price: 1.5,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/caramel-souffle.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Chocolate Muffin",
          description: "Muffin with chocolate heart.",
          price: 1.0,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/muffin-cioccolato.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Berries Muffin",
          description: "Muffin with berries heart.",
          price: 1.0,
          category: "Desserts",
          image: "/immagini/prodotti/dessert/berries-muffin.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
