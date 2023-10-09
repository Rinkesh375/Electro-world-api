const jwt = require("jsonwebtoken");
const BlackList = require("../models/blackList")
require('dotenv').config()
const authMiddleWare = async(req, resp, next) => {

    const token = req.headers['authorization']?.split(" ")[1]
    if(token){
        try {
           
            const verify = jwt.verify(token,process.env.secretKey)
   
            if(verify){
                const  blackListTokenPresent = await BlackList.findOne({token})
                if(blackListTokenPresent) resp.status(400).send({msg:"This token is already used please re-login"})
                else   next()
            }
            else resp.status(400).send("Provided token is incorrect")
           

        } catch (error) {
            resp.status(500).send({error})
        }
     }
     else resp.status(400).send({error:"token not provided"})

}

module.exports = authMiddleWare;