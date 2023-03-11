import express from "express"
import {addCategory, deleteCategory, getCategories} from "../controllers/categoryController"
const router = express.Router()

router.post('/add',addCategory)
router.get('/categories',getCategories)
router.delete('/:id/delete',deleteCategory)

export default router