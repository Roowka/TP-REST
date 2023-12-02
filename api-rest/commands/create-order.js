require("dotenv").config();
require("../src/utils/mongoose");

const prompts = require("prompts");
const Order = require("../src/models/Order");
const User = require("../src/models/User");
const Plate = require("../src/models/Plate");

async function main() {
  const questions = [
    {
      type: "number",
      name: "platesNumber",
      message: "How many plates ?",
    },
  ];

  const response = await prompts(questions);
  const user = await User.findOne({role: "USER"})
  const plate = await Plate.findOne()
  const restaurantId = plate.restaurantId
  const items = new Array(response.platesNumber).fill(plate)
  const order = Order.create({ user, items, restaurantId: restaurantId, status: "PROCESSED" });
  console.log("Order created", order);
}

main();
