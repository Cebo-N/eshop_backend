const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

const api = process.env.API_URL;

const productsRouter = require('./routers/product')

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter)


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