const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id : String,
    customer_id : String,
    stripe_customer_id : String,
    products : Array,
    amount : Number,
    amount_captured : Number,
    currency : String,
    payment_method_details : Object,
    billing_details : Object,
    shipping_details : Object 
},{
    timestamps : true
});

const Orders = mongoose.model("orders",orderSchema);

module.exports = Orders;