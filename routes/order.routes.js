const express = require("express");
const Orders = require("../models/order.model");

const router = express.Router();

router.get("/:userId" , async (req,res) => {
    try {
        const orders = await Orders.find(
            {customer_id : req.params.userId}
        );
        res.send(orders);
    } catch (error) {
        res.send(error)
    }
})




module.exports = router;