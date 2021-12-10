import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json())
app.use(morgan('tiny'))

const api = process.env.API_URL

app.get(`${api}/products`,(req,res) =>{
    const product = {
        id:1,
        name : 'Shampoo',
        image : 'http://image.png'
    }
    res.send(product);
})
app.post(`${api}/products`,(req,res) =>{
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct);
})

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log("Connection Successfull")
    })
    .catch((err)=>{
        console.log(err)
    })
app.listen(3000, ()=>{
    console.log("server running on http://localhost:3000");
})