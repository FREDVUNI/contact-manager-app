import { Request,Response } from "express"
import Contact from "../models/Contact"
import Joi from "joi"

export const addContact = async(req:Request,res:Response) =>{
    try{

        const schema = Joi.object({
            categoryId:Joi.string().min(3).max(200).required(),
            name:Joi.string().min(3).max(200).required(),
            description:Joi.string().min(3).max(500).required(),
            number:Joi.string().min(3).max(200).required(),
        })

        const { error } = schema.validate(req.body)

        if(error) return res.status(400).json(error.details[0].message)

        const { name,description,number,categoryId } = req.body

        if(!categoryId) return res.status(400).json('category was not found.')

        const check_contact = await Contact.findOne({name})
        if(check_contact) return res.status(400).json(`contact with name ${name.toLowerCase()} already exists.`)

        const contact = new Contact({
            categoryId,
            name,
            description,
            number
        })
        const new_contact = await contact.save()
        res.status(200).json({
            success:true,
            data:new_contact,
            message:'contact has been saved.'
        })

    }
    catch(error:any){
        res.status(500).json({error:error.message})
    }
}