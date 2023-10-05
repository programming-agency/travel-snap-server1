const mongoose = require("mongoose");
const { default: Stripe } = require("stripe");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    postCount: {
        type: Number,
        default: 0
    },
    userType: {
        type: String,
        enum: [
            "FREE",
            "PREMIUM"
        ],
        default: "FREE"
    },
    paymentID: String


});

module.exports = mongoose.model("User", userSchema);