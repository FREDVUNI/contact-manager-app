import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connect from "../database/connect"
import categoryRoutes from '../routes/category.routes'
import contactRoutes from '../routes/contact.routes'

const app = express()

dotenv.config({path:'.env'})
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/api/category',categoryRoutes)
app.use('/api/contact',contactRoutes)

connect()
app.listen(PORT, () => {
  console.log(`app is listening on  http://localhost:${PORT}`)
})
