import express from "express"
import {addCategory, getCategories} from "../controllers/categoryController"
const router = express.Router()

router.post('/add',addCategory)
router.get('/categories',getCategories)

export default router