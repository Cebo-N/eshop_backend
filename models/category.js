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
categorySchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});
const Category = mongoose.model('Category',categorySchema);
module.exports = Category;