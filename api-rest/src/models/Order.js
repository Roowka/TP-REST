const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        user: {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },
            email: {
                type: String,
                required: true,
            }
        },
        items: [
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
                }
            }
        ],
        restaurantId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["PROCESSED", "CANCELED", "DELIVERED"],
            default: "PROCESSED",
            required: true,
        }
        // Avec des id pour faire les relations
        // user: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
        // restaurantId: {
        //     type: String,
        //     required: true,
        // },
        // items: [{
        //     type: mongoose.Types.ObjectId,
        //     ref: "Plate",
        //     required: true,
        // }],
        // status: {
        //     type: String,
        //     enum: ["PROCESSED", "CANCELED", "DELIVERED"],
        //     default: "PROCESSED",
        //     required: true,
        // },
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
