import mongoose from "mongoose";
import { ICategory } from "../types/types";

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
},{timestamps:true})

const Category = mongoose.model<ICategory>("categories",categorySchema)
export default Category