const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require : true
        },
        passwordHash : {
            type : String,
            require : true
        },
        street : {
            type : String,
            require : true
        },
        apartment : {
            type : String,
            require : true
        },
        city : {
            type : String,
            require : true
        },
        postalCode :{
            type : String,
            require : true
        },
        country : {
            type : String,
            require : true
        },
        phone:{
            type : String,
            require : true
        },
        isAdmin : {
            type : Boolean,
            require : true
        }
    },
    {
        timestamps : true
    }
);

const User  = mongoose.model("User",userSchema);
module.exports = User