const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,

    },
    content: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: false,
      }
    ],

    userName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
      default: []
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
