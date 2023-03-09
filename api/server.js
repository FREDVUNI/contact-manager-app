import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
const app = express()

app.use(morgan("tiny"))
app.use(cors())
dotenv.config({path:'.env'})

const PORT = process.env.PORT || 8080

app.listen(PORT,() =>{
    console.log(`server started on http://localhost:${PORT}`)
})
