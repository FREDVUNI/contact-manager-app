import { Request, Response } from 'express';
import Category from "../models/Category";
import Joi from 'joi'

const addCategory = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
            category: Joi.string().required().min(3)
        })

        const {error} = schema.validate(req.body)
        if(error) return res.status(400).json(error.details[0].message)

        const { category } = req.body

        const check_category = await Category.findOne({category})
        if(check_category) return res.status(400).json(`category ${category.toLowerCase()} already exists.`)

        const saveCategory = new Category({
            category:category
        })

        await saveCategory.save()
        res.status(201).json('category has been saved.')
    }
    catch(error){
        res.status(500).json(error)
    }
}

export default addCategory