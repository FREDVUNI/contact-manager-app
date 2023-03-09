import express from "express"
import dotenv from "dotenv"
import connect from "../database/connect"
const app = express()

dotenv.config({path:'.env'})
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connect()
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})