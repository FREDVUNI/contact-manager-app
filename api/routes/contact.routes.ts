import express from "express";
import { addContact, getContacts } from "../controllers/contactController";
const router = express.Router()

router.post('/add',addContact)
router.get('/contacts',getContacts)

export default router