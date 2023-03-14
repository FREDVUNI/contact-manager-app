import { Request, Response } from 'express';
import Category from "../models/Category";
import Joi from 'joi'

export const addCategory = async(req:Request,res:Response) =>{
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

        const new_category = await saveCategory.save()
        res.status(201).json({
            success:true,
            message:'category has been saved.',
            data:new_category
        })
    }
    catch(error:any){
        res.status(500).json({error:error.message})
    }
}

export const getCategories = async(req:Request,res:Response) =>{
    try{
        const categories = await Category.find({})
        .populate('contacts')
        .exec()
        res.status(200).json(categories)
    }
    catch(error:any){
        res.status(500).json({error:error.message})
    }
}

export const deleteCategory = async(req:Request,res:Response) =>{
    try{
        const { categoryId } = req.body

        const categories = Category.findOne({
            _id:categoryId
        })

        if(!categories) return res.status(404).json('category was not found.')

        const category = await Category.findByIdAndDelete(categoryId)

        if(category){
            return res.status(200).json({
                success:true,
                data:category,
                message:'category has been deleted.'
            })
        }else{
            return res.status(404).json('category was not found.')
        }
    }
    catch(error:any){
        res.status(500).json({error:'category was not found.'})
    }
}

export const getCategory = async(req:Request,res:Response) =>{
    try{
        const {categoryId} = req.params

        const categories = Category.findOne({
            _id:categoryId
        })

        if(!categories) return res.status(404).json('category was not found.')

        const category = await Category.findById(categoryId)

        if(category){
            return res.status(200).json({
                success:true,
                data:category,
            })
        }else{
            return res.status(404).json('category was not found.')
        }

    }
    catch(error:any){
        res.status(500).json({error:'category was not found.'})
    }
}

export const updateCategory = async(req:Request,res:Response) =>{
    try{
        const {categoryId} = req.params

        const { title } = req.body

        const schema = Joi.object({
            title: Joi.string().required().min(3)
        })

        const {error} = schema.validate(req.body)
        if(error) return res.status(400).json(error.details[0].message)

        const categories = Category.findOne({
            _id:categoryId
        })

        if(!categories) return res.status(404).json('category was not found.')

        const check_category = await Category.findOne({category:title})
        if(check_category) return res.status(400).json(`category ${title.toLowerCase()} already exists.`)

        const category = await Category.findByIdAndUpdate(
            {_id:categoryId},{category:title},{new:true}
        )

        if(category){
            return res.status(200).json({
                success:true,
                data:category,
                message:'category has been updated.'
            })
        }else{
            return res.status(404).json('category was not found.')
        }

    }
    catch(error:any){
        res.status(500).json({error:'category was not found.'})
    }
}
