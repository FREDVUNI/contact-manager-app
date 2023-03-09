import express from "express"
import dotenv from "dotenv"
// import cors from "cors"
import connect from "../database/connect"
import categoryRoutes from '../routes/category.routes'
const app = express()

dotenv.config({path:'.env'})
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(cors())

app.use('/api/category',categoryRoutes)

connect()
app.listen(PORT, () => {
  console.log(`app is listening on  http://localhost:${PORT}`)
})

function cors(): any {
  throw new Error("Function not implemented.")
}
