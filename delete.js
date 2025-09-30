// deleteProducts.js
require('dotenv').config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const idsToDelete = [
  "6858d5596a3876c1a1ea82f6",
  "6858d5796a3876c1a1ea82fa",
  "6858d56a6a3876c1a1ea82f8"
];

const deleteProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({ _id: { $in: idsToDelete } });
    console.log("✅ Deleted all specified products");

    await mongoose.disconnect();
    console.log("✅ Disconnected from DB");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

deleteProducts();
