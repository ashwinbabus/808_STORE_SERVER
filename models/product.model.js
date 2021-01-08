const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    sku : Number,
    title : String,
    brand : String,
    price : Number,
    category : String,
    variants : Object,
    description : String,
    images : Array
},{
    timestamps : true
}
);

const Products = mongoose.model("products",productSchema);

module.exports = Products;
