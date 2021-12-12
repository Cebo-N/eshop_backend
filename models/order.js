const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        orderItems : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'OrderItem'
        }],
        shippingAddress1 : {
            type : String,
            require : true
        },
        shippingAddress2 : {
            type : String,
            require : false
        },
        city : {
            type : String,
            require : true
        },
        postalCode : {
            type : Number,
            require : true
        },
        country : {
            type : String,
            require : true
        },
        phone : {
            type : String,
            require : true
        },
        status : {
            type : String,
            require : true
        },
        totalPrice : {
            type : Number,
            require : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    },
    {
        timestamps : true
    }
);

const Order = mongoose.model('Oder',orderSchema);

module.exports = Order