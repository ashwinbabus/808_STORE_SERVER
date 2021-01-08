const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");

router.get("/",async(req,res)=>{
    try {
        const addresses = await Address.find({userId : req.query.userId})
        res.send(addresses);
    } catch (error) {
        res.send(error)
    }
})

router.post("/",async(req,res)=>{
    try {
        const address = await Address.create(req.body);
        res.send(address);
    } catch (error) {
        res.send(error);
        console.log("error ",error);
    }
})

router.put("/",async(req,res)=>{
    console.log("update ::: ",req.body);
    try {
        const address = await Address.findByIdAndUpdate(req.body._id,req.body)
        res.send(address);
    } catch (error) {
        res.send(error)
    }
})

router.delete("/",async(req,res)=>{
    try {
        await Address.deleteOne({_id : req.body._id})
        res.send("Deleted")
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;