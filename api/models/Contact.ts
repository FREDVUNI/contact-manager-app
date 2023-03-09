import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    category:{
        type:mongoose.Types.ObjectId,refs:"Category",
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

const Contact = mongoose.model("contacts",contactSchema)
export default Contact