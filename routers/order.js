const express = require('express')
const Order = require('../models/order');

const router = express.Router()

router.get('/', async (req,res) =>{
    try {
        const orders = await Order.find();
        if(!orders){
            res.status(500).json({
                success : false
            })
        }
        res.status(201).json(orders)
        
    } catch (error) {
        res.status(404).json({
            message : "Could not retrieve orders",
            success : false
        })
    }
});

router.post('/', async (req, res) =>{
    try {
        const newOrder = Order({
            orderItems : req.body.orderItems,
            shippingAddress1 : req.body.shippingAddress1,
            shippingAddress2 : req.body.shippingAddress2,
            city : req.body.city,
            postalCode : req.body.postalCode,
            country : req.body.country,
            phone : req.body.phone,
            status : req.body.status,
            totalPrice : req.body.totalPrice,
            user : req.body.user
        })

        const order = await newOrder.save();
        res.status(200).json(order)
    } catch (error) {
        res.status(401).json({
            message : "Error while posting an order",
            success : false
        })
    }
})

module.exports = router;