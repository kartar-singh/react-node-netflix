const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category : {
        type:String,
        required:true
    },
    register : 
        [
            { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Register'
            }
        ]
})

// now we need to create a collection

const Category = new mongoose.model("Category",categorySchema)

module.exports = Category