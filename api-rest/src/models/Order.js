const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        restaurantId: {
            type: String,
            required: true,
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plate",
            required: true,
        }],
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
Schema.methods.toJSON = function () {
    return {
        user: this.user,
        items: this.items,
        restaurantId: this.restaurantId,
        status: this.status,
        _id: this._id
    };
};

module.exports = mongoose.model("Order", Schema);
