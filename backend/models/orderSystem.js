const mongoose = require("mongoose");

const orderSystemSchema = mongoose.Schema({
  nameProduct:{
    type: String,
    required: [true, "Nhập tên sách"],
    trim: true,
  },
  nameBorrow: {
    type: String,
    required: [true, "Nhập tên người mượn"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  numberOfDays:{
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Đang mượn",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OrderSystem", orderSystemSchema);
