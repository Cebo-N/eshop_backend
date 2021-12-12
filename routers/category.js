const Category = require('../models/category');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const categories = await Category.find();
        res.send(categories)
        
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
        });

        const category = await newCategory.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(401).json({
            message : 'Error while trying to post a category',
            success : false,
            error : error
        })
    }
});

router.delete('/:id', async (req,res) =>{
    try {
        await Category.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success : true,
            message : 'category has been deleted'
        }
        )
    } catch (error) {
        res.status(404).json({
            message : 'Could not deleted the category',
            error : error,
            success : false
        })
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const foundCategory = await Category.findById(req.params.id);
        res.status(200).send(foundCategory);
        
    } catch (error) {
        res.status(400).json({
            success : false,
            message : 'Could not retrieve requested category',
            error : error
        })
    }
});

router.put('/:id', async (req, res) =>{
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name : req.body.name,
                icon : req.body.icon,
                color : req.body.color
            },
            {
                new : true
            }
        );
        res.status(200).send(updatedCategory);
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to update the category",
            error : error
        })
    }
})

module.exports = router