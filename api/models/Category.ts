import mongoose from "mongoose";
import Contact from "./Contact";

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
        unique:true
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }]
},{timestamps:true})

categorySchema.pre("remove",function(this: any,next){
    Contact.find({category: this._id},(err:any,contacts:any) =>{
        if(err){
            next(err)
        }else if(contacts.length > 0){
            next(new Error('This category has existing contacts.'))
        }else{
            next()
        }
    })
})

const Category = mongoose.model("categories",categorySchema)
export default Category