const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) =>{
    try {
        const users = await User.find().select('-passwordHash');
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
            passwordHash :bcrypt.hashSync(req.body.password, 10),
            street : req.body.street,
            apartment : req.body.apartment,
            city : req.body.city,
            postalCode : req.body.postalCode,
            country : req.body.country,
            phone: req.body.phone,
            isAdmin : req.body.isAdmin
        });

        const user = await newUser.save();
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mesage : 'Error occured while trying to post user data',
            success : error
        })
    }
});

router.post('/register', async (req, res) =>{
    try {
        const newUser = User({
            name : req.body.name,
            email : req.body.email,
            passwordHash :bcrypt.hashSync(req.body.password, 10),
            street : req.body.street,
            apartment : req.body.apartment,
            city : req.body.city,
            postalCode : req.body.postalCode,
            country : req.body.country,
            phone: req.body.phone,
            isAdmin : req.body.isAdmin
        });

        const user = await newUser.save();
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mesage : 'Error occured while trying to register a user',
            success : error
        })
    }
});

router.get('/:id', async (req,res) =>{
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
                message : 'Invalid user Id requested'
            })
        }
        const user = await User.findById(req.params.id).select('-passwordHash');
        res.status(200).send(user)

    } catch (error) {
        res.status(500).json({
            message : 'Failed to retrieve the requested user',
            success : true
        })
    }
});

router.post('/login', async (req, res) =>{
    try {
        const user = await User.findOne({
            email : req.body.email
        })
        console.log(user)
        if(!user){
            return res.status(400).json({
                message : 'User not found',
                success : false
            })
        }
        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId : user._id,
                    isAdmin : user.isAdmin
                    
                },
                process.env.SECRET_KEY,
                {
                    expiresIn : '1d'
                }
            )
            res.status(200).json({
                user : user.email,
                token : token
            })
        }else{
            res.status(400).send('password is incorrect')
        }


        //res.status(200).send(user)

    } catch (error) {
        res.status(500).json({
            message : 'Error occured while trying to login',
            success : false
        })
    }
});

router.get('/get/count', async (req,res) =>{
    try {
        const userCount = await User.countDocuments()
        res.send({
            userCount : userCount
        })
    } catch (error) {
        res.status(400).json({
            message : 'Error occured while getting the number of products',
           sucesss : false
        })
    }
});

router.delete('/:id', async (req,res) =>{
    try {
         if(!mongoose.isValidObjectId(req.params.id)){
             return res.status(400).json({
                 message : 'Invalid user id',
                 sucesss : false
             })
         }
         await User.findByIdAndDelete(req.params.id)
         res.status(200).json({
             message : 'Product user',
             sucesss : true
         })
    } catch (error) {
        res.status(500).json({
            message : 'Failed to delete the User',
            sucesss : false
        })
    }
  });

module.exports = router