const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
Schema.methods.toJSON = function () {
  return {
    name: this.name,
    image: this.image,
    price: this.price,
    _id: this._id
  };
};

module.exports = mongoose.model("Plate", Schema);
