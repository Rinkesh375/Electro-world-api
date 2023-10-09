const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleWare = require("../middleWares/authMiddle");
const User = require("../models/userModel");
const BlackList = require("../models/blackList");

userRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (hash) {
                    await User.create({ ...req.body, password: hash })
                    res.status(201).json({ msg: "User has been created", user: req.body })
                }
                else res.status(400).json({ err: err.message });
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    }
    else res.status(400).json({ msg: "This email already exists" });
})



userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ project:"Electro-World" }, process.env.secretKey);
                 user._doc.token = token
               
                res.status(200).json(user)
            }
            else res.status(400).json({ err: "Invalid credentials!" })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    }
    else res.status(400).json({ msg: "This email does not exist!" })
})





userRouter.get("/addToCart/:id", authMiddleWare, async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
          const addToCart = user.addToCart;
          res.status(200).json(addToCart)
        }
        else res.status(400).json({ err: "Given id does not match" })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

})


userRouter.patch("/addToCart/:id", authMiddleWare, async (req, res) => {

    try {
     
        const { id } = req.params;
        const addToCart = req.body
       
        const user = await User.findByIdAndUpdate(id,{addToCart},{new:true});
        if (user) {
        
          res.status(200).json(user)
        }
        else res.status(400).json({ err: "Given id does not match" })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

})



userRouter.get("/logout", async (req, resp) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if(token){
        try {
              await  BlackList.create({token});
              resp.status(200).send("logout successfully")
        } catch (error) {
            resp.status(500).send({error})
        }
    }
    else resp.status(400).send("token not provided")

})




module.exports = userRouter;