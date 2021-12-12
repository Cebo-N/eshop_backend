const Product = require('../models/product');
const Category = require('../models/category');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/',async (req,res) =>{
    try {
        let filter = {};

        if(req.query.categories){
            filter = {category : req.query.categories.split(',')}
        }
        const products = await Product.find(filter);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
         message : 'Could not retrieve products',
         sucesss : false,
         error : error
        })
    }
 });

 router.get('/:id', async (req, res) =>{
     try {
        const requestedProduct = await Product.findById(req.params.id)
            .populate('category');
        res.status(200).send(requestedProduct);
         
     } catch (error) {
         res.status(500).json({
             sucesss : false,
             message : 'Failed to retrieve the requested product'
         });
     }
 })

 router.post('/', async(req,res) =>{
     try {
        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).json({
            message : 'Tried to insert an invalid category',
            sucesss : false
        })
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
            numReviews : req.body.numReviews,
            isFeatured: req.body.isFeatured
         });
         const createdProduct = await newProduct.save();
         res.status(201).send(createdProduct);

     } catch (error) {
         res.status(500).json({
            message : "Error occured while trying to post a new product",
            sucesss : false
         })
         
     }
 });

 router.put('/:id', async (req, res) =>{
     try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
                message : 'Invalid product id',
                sucesss : false
            })
        }
        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).json({
            message : 'Tried to update product with an invalid category',
            sucesss : false
        })
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
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
                numReviews : req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            {
                new : true
            }
        );
        res.status(200).send(updatedProduct)
     } catch (error) {
         res.status(500).json({
             message : 'Error occured while tying to update the product',
             success : false
         })
     }
 });

 router.delete('/:id', async (req,res) =>{
   try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
                message : 'Invalid product id',
                sucesss : false
            })
        }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : 'Product deleted',
            sucesss : true
        })
   } catch (error) {
       res.status(500).json({
           message : 'Failed to delete the product',
           sucesss : false
       })
   }
 });

 router.get('/get/count', async (req,res) =>{
     try {
         const productCount = await Product.countDocuments()
         res.send({
             numberOfProducts : productCount
         })
     } catch (error) {
         res.status(400).json({
             message : 'Error occured while getting the number of products',
            sucesss : false
         })
     }
 });

 router.get('/get/featured/:count', async (req,res) =>{
   try {
        const count = req.params.count ? req.params.count : 0;
        const featuredProducts = await Product.find({
            isFeatured : true
        }).limit(count);

        res.send(featuredProducts);
   } catch (error) {
       res.status(400).json({
           message: 'Failed get featured products',
           sucesss : false
       })
   }
 })


 module.exports = router;