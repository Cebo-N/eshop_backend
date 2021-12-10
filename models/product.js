const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    image : String,
    quantity : Number
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product