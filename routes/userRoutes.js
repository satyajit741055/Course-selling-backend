const express = require("express");
const jwt = require("jsonwebtoken")
const JSONSECREATE = require("../config")
const { User,Course } = require("../db")
const bcrypt = require("bcrypt")
const router = express.Router()
const userAuth = require("../middleware/userAuth")


router.post("/signup",async (req,res)=>
    {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password,6);

        await User.create({
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYW5ha2FybXVsZSIsImlhdCI6MTczODY2MzkxOX0.ihdYG8qciAswmVOU3Jdn1v_ORdS0pJKYdLFf0z4X7FM

router.get("/courses",userAuth, async (req,res)=>
    {
        const coursesAll = await Course.find()
        res.json({coursesAll})
    })

router.post("/courses/:courseId",userAuth, async (req,res)=>
    {
        const id = req.params.courseId;
        const user = await User.findOne({name: req.username});
        user.purchasedCourses.push(id);
        await user.save();
        res.json({
            message: "Course purchased successfully!"
        }
        )
})

router.get("/purchasedCourses",userAuth, async (req,res)=>
    {
        const user = await User.findOne({name: req.username});
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses
            }
        });
    
        res.json({
            courses: courses
        })
})




module.exports = router;




