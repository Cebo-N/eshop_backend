const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        passwordHash : {
            type : String,
            required : true
        },
        street : {
            type : String,
            default : ''
        },
        apartment : {
            type : String,
            default : ''
        },
        city : {
            type : String,
            default : ''
        },
        postalCode :{
            type : Number,
           default : ''
        },
        country : {
            type : String,
            default : ''
        },
        phone:{
            type : String,
            require : true
        },
        isAdmin : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true
    }
);

userSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const User  = mongoose.model("User",userSchema);
module.exports = User