import express from "express"
import {addCategory, deleteCategory, getCategories, getCategory, updateCategory} from "../controllers/categoryController"
const router = express.Router()

router.post('/add',addCategory)
router.get('/categories',getCategories)
router.get('/:categoryId',getCategory)
router.put('/:categoryId',updateCategory)
router.delete('/delete',deleteCategory)

export default router