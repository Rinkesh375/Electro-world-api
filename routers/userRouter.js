const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


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
            if (match)  res.status(200).json(user)
            else res.status(400).json({ err: "Invalid credentials!" });
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    }
    else res.status(400).json({ msg: "This email does not exist!" })
})





userRouter.get("/addToCart/:id",  async (req, res) => {

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


userRouter.patch("/addToCart/:id",  async (req, res) => {

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








module.exports = userRouter;