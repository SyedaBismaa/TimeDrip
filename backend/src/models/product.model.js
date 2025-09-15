const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, default: "watches" },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  images: [{ url: { type: String, required: true } }],
  stock: { type: Number, required: true, default: 1 },
  ratings: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
