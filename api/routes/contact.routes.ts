import express from "express";
import { addContact, deleteContact, getContacts } from "../controllers/contactController";
const router = express.Router()

router.post('/add',addContact)
router.get('/contacts',getContacts)
router.delete('/delete',deleteContact)

export default router