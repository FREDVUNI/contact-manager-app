import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Category",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true   
    },
    number:{
        type:String,
        required:true
    }

},{timestamps:true})

const Contact = mongoose.model("Contact",contactSchema)
export default Contact