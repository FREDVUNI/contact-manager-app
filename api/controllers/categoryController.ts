import Category from "../models/Category";

const addCategory = async(req:Request,res:Response) =>{
    try{
        const { category } = req.body

        const saveCategory = new Category({
            category:category
        })

        await saveCategory.save()
    }
    catch(error){
        // res.status(500).json(error)
    }
}

export default addCategory