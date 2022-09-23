const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    moviename : {
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    status : {
        type:Boolean,
        
    },
    rating : {
        type:Number,
        required:true
    },
    uploaded_file : {
        type:String,
       
    },
   

})

// now we need to create a collection

const Register = new mongoose.model("Register",employeeSchema)

module.exports = Register