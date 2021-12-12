const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name : {
            type : String,
            require : true
        },
        color : {
            type : String,
        },
        icon : {
            type : String,
        },
    },
    {
        timestamps : true
    }
);

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;