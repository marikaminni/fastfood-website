const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Fastfood Website",
    description: "API documentation for the project",
    "x-logo": {
      url: "http://localhost:5500/immagini/burger-icon.png",
      backgroundColor: "#FFFFFF",
      altText: "Burger Bros",
    },
  },
  host: "localhost:5500",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Auth",
      description: "Authentication routes",
    },
    {
      name: "Products",
      description: "Products routes",
    },
    {
      name: "Orders",
      description: "Orders routes",
    },
    {
      name: "Booking",
      description: "Booking routes",
    },
  ],
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
