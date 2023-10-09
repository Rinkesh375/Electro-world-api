const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRouter")
const productRouter  = require("./routers/productRouter")
const {connection} = require("./dbConnect/dbConnection")
require("dotenv").config();
const port = process.env.PORT || 4000


app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
       res.status(200).json({msg:"Home page"})
})

app.use("/users",userRouter)
app.use("/products",productRouter)


app.listen(port,async()=>{
         try {
            await connection
         } catch (error) {
            
         }
})


