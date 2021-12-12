const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
        },
        description : {
            type : String,
            required : true,
            trim : true,
        },
        richDescription : {
            type : String,
            trim : true,
            default : ''
        },
        image : {
            type : String,
            required : true,
        },
        images : [{
            type : String

        }],
        brand : {
            type : String,
            default : '',
            trim : true,
        },
        price : {
            type : Number,
            required : true,
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category',
            required : true
        },
        countInStock : {
            type : Number,
            required : true,
            min : 0,
            max : 500
        },
        rating : {
            type : Number,
            min : 1,
            max : 5
        },
        numReviews : {
            type : Number,
            default : 0
        },
        isFeatured : {
            type : Boolean,
            default : false
        }
    
    },
    {
        timestamps : true
    }
);

const Product = mongoose.model('Product', productSchema)

module.exports = Product