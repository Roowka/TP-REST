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
  const reducedUser = {
    _id: user._id,
    email: user.email
  }
  const restaurant = await User.findOne({role: "RESTAURANT"})
  const plate = {
    name: "Tiramisu",
    image: "https://www.galbani.fr/wp-content/uploads/2017/07/Galbani_Veritable_Tiramisu_opt2.jpg",
    price: 4.99
  }
//  Si on veut mettre des vrais plats
//   const plate = await Plate.findOne()
//   const restaurantId = plate.restaurantId
  const items = new Array(response.platesNumber).fill(plate)
  const order = Order.create({ user: reducedUser, items: items, restaurantId: restaurant._id, status: "PROCESSED" });
  console.log("Order created", order);
}

main();
