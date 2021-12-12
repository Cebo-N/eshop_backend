const Product = require('../models/product');
const express = require('express');

const router = express.Router();

router.get('/',async (req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(401).json({
         message : 'Could not retrieve products',
         sucesss : false,
         error : error
        })
    }
 })

 router.post('/', async(req,res) =>{
     try { 
         const newProduct = Product({
            name : req.body.name,
            description : req.body.description,
            richDescription : req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category : req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured
         });
         const createdProduct = await newProduct.save();
         res.status(201).json(createdProduct);
     } catch (error) {
         res.send(error)
         
     }
 })

 module.exports = router;