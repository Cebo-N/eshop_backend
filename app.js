const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors())
const api = process.env.API_URL;

const productsRouter = require('./routers/product');
const ordersRouter = require('./routers/order');
const usersRouter = require('./routers/user');
const categoriesRouter = require('./routers/category')

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/orders`,ordersRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/users`,usersRouter)



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