const Category = require('../models/category');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
        
    } catch (error) {
        res.status(404).json({
            message : 'Could not retrieve categories',
            success : false
        })
    }
});

router.post('/', async (req,res) =>{
    try {
        const newCategory = Category({
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
            image: req.body.image
        });

        const category = await newCategory.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(401).json({
            message : 'Error while trying to post a category',
            success : false
        })
    }
});

module.exports = router