import { Request,Response } from "express"
import Contact from "../models/Contact"
import Joi from "joi"
import Category from "../models/Category"

export const addContact = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
            category:Joi.string(),
            name:Joi.string().min(3).max(200).required(),
            description:Joi.string().min(3).max(500).required(),
            number:Joi.string().min(3).max(200).required(),
        })

        const { error } = schema.validate(req.body)

        if(error) return res.status(400).json(error.details[0].message)

        const { name,description,number,category } = req.body

        if(!category) return res.status(400).json('category was not found.')

        const check_contact = await Contact.findOne({name})
        if(check_contact) return res.status(400).json(`contact with name ${name.toLowerCase()} already exists.`)

        // Find the category by name or create a new one
        const foundCategory = await Category.findOne({category})
        let categoryId;
        if (foundCategory) {
            categoryId = foundCategory._id;
        } else {
            const newCategory = new Category({category});
            const savedCategory = await newCategory.save();
            categoryId = savedCategory._id;
        }

        const contact = new Contact({
            category: categoryId,
            name,
            description,
            number
        })
        const new_contact = await contact.save()

        // Update the category's contacts array
        await Category.findOneAndUpdate(
            {_id: categoryId},
            {$push: {contacts: {_id:new_contact._id}}}
        );

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


export const getContacts = async (req: Request, res: Response) => {
    try {
      const contacts = await Contact.find()
        .populate('category', 'category') // use 'ref' value as first argument and specify fields to return as second argument
        .exec();
      res.status(200).json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
}

export const deleteContact = async (req:Request,res:Response) => {
    try{
        const { contactId } = req.body

        if(!contactId) return res.status(400).json(`The contact Id is reqiured.`)

        const contacts = await Contact.findOne({
            _id: contactId
        })

        if(!contacts) return res.status(404).json(`The contact was not found.`)

        const contact = await Contact.findByIdAndDelete(contactId)

        if(contact){
            return res.status(200).json({
                success:true,
                data:contact,
                message:'contact has been deleted.'
            })
        }else{
            return res.status(404).json('contact was not found.')
        } 

    }
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
}
  