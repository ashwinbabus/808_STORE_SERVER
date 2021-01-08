mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    fullname : String,
    house_number : String,
    area : String,
    city : String,
    state : String,
    mobile : String,
    pincode : String,
    userId : String,
})

const Address = mongoose.model("addresses",addressSchema);

module.exports = Address;