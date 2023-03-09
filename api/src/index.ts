import express from "express"
import dotenv from "dotenv"
const app = express()

dotenv.config({path:'.env'})
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})