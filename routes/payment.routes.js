const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const stripe = require("stripe")(
  "sk_test_51GsSazDTNX0XYG0o3va208TCLQYSWjgjuuCCm6lxXFC2zqWCYpgQMrSAxMwykz0DKUKA6MTlUHPv85HBuHR3DdNw00BqBISZFu"
);

router.post("/", async (req, res) => {
  const { total, token, address, userId, cartItems } = req.body;
  const idempotencyKey = uuid();
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const result = await stripe.charges.create(
      {
        amount: total,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of `,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
            line1: address.house_number,
            line2: address.area,
            city: address.city,
            state: address.state,
            postal_code: address.pincode,
          },
        },
      },
      { idempotencyKey }
    );

    const order = await Order.create({
      order_id: result.id,
      customer_id: userId,
      stripe_customer_id: result.customer,
      products: cartItems,
      amount: result.amount,
      amount_captured: result.amount_captured,
      currency: result.cuurency,
      payment_method_details: result.payment_method_details,
      billing_details: result.billing_details,
      shipping_details: result.shipping,
    });

    console.log(result);
    res.status(200).json({ result, order, user });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
