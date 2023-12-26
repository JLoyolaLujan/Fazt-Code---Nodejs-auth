// products router

// import express
const express = require("express"); 
const router = express.Router();

// import middlewares
const {verifyToken, isModerator, isAdmin} = require("../middlewares/auth.jws");

// import model
const Product = require("../models/Products");

/*
create products - needs token - moderator 
get product by id - user
update product by id - needs token - admin
delete product by id - needs token - admin
*/

// get "/"
router.get("/", async (req, res) => {
    try {
        const products  = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// get by id "/:id"
router.get("/:id", async (req, res) => {
    try {
        // get id
        const id = req.params.id; 
        const product = await Product.findById(id); 
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// post in "/"

router.post("/", [verifyToken, isModerator], async (req, res) => {
    try {
        const newProduct = new Product(req.body); 
        await newProduct.save(); 
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
});

// update by id

router.put("/:id", [verifyToken, isAdmin], async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
}); 

// delete by id
router.delete("/:id", [verifyToken, isAdmin], async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product has been succesfully deleted" });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    } 
}); 

// export router
module.exports = router;