const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
            trim : true,
        },
        description : {
            type : String,
            require : true,
            trim : true,
        },
        richDescription : {
            type : String,
            require : true,
            trim : true,
        },
        image : {
            type : String,
            require : true,
        },
        images : {
            type : Array,
            require : false,
        },
        brand : {
            type : String,
            require : true,
            trim : true,
        },
        price : {
            type : Number,
            require : true,
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category'
        },
        countInStock : {
            type : Number,
            require : true
        },
        rating : {
            type : Number,
            require : false
        },
        isFeatured : {
            type : Boolean,
            require : true
        }
    
    },
    {
        timestamps : true
    }
);

const Product = mongoose.model('Product', productSchema)

module.exports = Product