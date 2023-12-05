require("dotenv").config();
require("../src/utils/mongoose");

const prompts = require("prompts");
const Order = require("../src/models/Order");
const User = require("../src/models/User");
const Plate = require("../src/models/Plate");
const authenticator = require("../src/services/authenticator");

async function main() {
  const questions = [
    {
      type: "number",
      name: "platesNumber",
      message: "How many plates ?",
    },
  ];

  const response = await prompts(questions);

  let user = await User.findOne({role: "USER"})

  if (!user) {
    userInfos = {
      email: "user@example.com",
      name: "Lucas Goi",
      role: "USER",
      password: "123456",
    }
    user = await authenticator.create(userInfos);
  }

  const reducedUser = {
    _id: user._id,
    email: user.email
  }

  let restaurant = await User.findOne({role: "RESTAURANT"})

  if(!restaurant) {
    restaurantInfos = {
      email: "resto@example.com",
      name: "Lucas's House",
      role: "RESTAURANT",
      password: "123456"
    };
    restaurant = await authenticator.create(restaurantInfos);
  }

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
