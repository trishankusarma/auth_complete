const express =  require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(
    cors({
      origin: `http://localhost:3000`,
      credentials: true,
    })
  );

app.use(cookieParser("secret"));


require("dotenv").config()
require('./db/db')

const routes = require('./routes')

app.use('/',routes)

const { PORT } = process.env

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`)
})