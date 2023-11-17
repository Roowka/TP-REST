const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "RESTAURANT"],
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);
Schema.methods.toJSON = function () {
  return {
    name: this.name,
    city: this.city,
    address: this.address,
    postalCode: this.postalCode,
    _id: this._id,
    email: this.email,
    role: this.role,
  };
};

module.exports = mongoose.model("User", Schema);
