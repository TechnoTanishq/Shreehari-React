const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // custom string ID like "b001"
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  badge: { type: String }, // e.g., "Best Seller"
  stock: { type: Number, default: 0 },
  description: { type: String },
  details: [{ type: String }], // array of strings
  category: {type: String},
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
