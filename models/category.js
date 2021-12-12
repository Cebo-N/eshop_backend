const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name : {
            type : String,
            require : true
        },
        color : {
            type : String,
            require : true
        },
        icon : {
            type : String,
            require : true
        },
        image : {
            type : String,
            require : true
        }
    },
    {
        timestamps : true
    }
);

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;