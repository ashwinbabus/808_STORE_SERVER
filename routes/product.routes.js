const express = require("express");
const Products = require("../models/product.model");
const router = express.Router();              

router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await Products.create(req.body);
    res.send("Data inserted");
  } catch (error) {
    res.send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    await Products.deleteMany({});
    res.send("All documents deleted");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
