require("dotenv").config();
require("../src/utils/mongoose");

const prompts = require("prompts");
const authenticator = require("../src/services/authenticator");

async function main() {
  const questions = [
    {
      type: "text",
      name: "email",
      message: "What is your email ?",
    },
    {
      type: "password",
      name: "password",
      message: "What is your password ?",
    },
  ];

  const response = await prompts(questions);
  const user = await authenticator.create({ ...response, role: "USER" });
  console.log("user created", user);
}

main();
