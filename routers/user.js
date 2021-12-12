const User = require('../models/user');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const users = await User.find();
        res.status(201).json(users)
    } catch (error) {
        res.status(404).json({
            message : 'Could not retrieve users',
            success : false
        })
    }
})

router.post('/', async (req, res) =>{
    try {
        const newUser = User({
            name : req.body.name,
            email : req.body.email,
            passwordHash : req.body.passwordHash,
            street : req.body.street,
            apartment : req.body.apartment,
            city : req.body.city ,
            postalCode : req.body.postalCode,
            country : req.body.country, 
            phone : req.body.phone,
            isAdmin : req.body.isAdmin ,
        });

        const user =  await newUser.save();
        res.status(200).json(user)
        
    } catch (error) {
        res.status(401).json({
            mesage : 'Error occured while trying to post user data',
            success : false
        })
    }
});

module.exports = router