const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên sách"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Nhập tên tác giả"],
    trim: true,
  },
  publishing: {
    type: String,
    required: [true, "Nhập tên nhà xuất bản"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Nhập mô tả"],
  },
  price: {
    type: Number,
    required: [true, "Nhập giá"],
    maxLength: [8, "Giá tối đa 8 ký tự"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Nhập danh mục sách"],
  },
  Stock: {
    type: Number,
    required: [true, "Nhập số lượng"],
    maxLength: [4, "không vượt quá 4 ký tự"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
