const express = require("express");
const jwt = require("jsonwebtoken")
const JSONSECREATE = require("../config")
const { Admin,Course } = require("../db")
const adminAuth = require("../middleware/adminAuth")
const bcrypt = require("bcrypt")
const router = express.Router()


router.post("/signup",async (req,res)=>
    {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password,6);

        await Admin.create({
            name:username,
            password:hashedPassword
        })

        const token = jwt.sign({username},JSONSECREATE)
        
        res.json({
            message: "User Created Successfully",
            token : token
        })
    }
);


router.post("/courses",adminAuth,async (req,res)=>
    {
        
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;

        await Course.create({
            title,
            description,
            price,
            imageLink
        })

        res.json({message: "Course saved Successfuly"})
        
});



router.get("/courses",adminAuth, async (req,res)=>
{
    const coursesAll = await Course.find()
    console.log(coursesAll)
})



module.exports = router;