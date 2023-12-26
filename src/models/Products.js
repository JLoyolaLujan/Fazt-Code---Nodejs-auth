const mongoose = require("mongoose");

// Schema 

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
}, {
    timestamps: true, 
    versionKey: false
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;