const { Admin } = require("../db")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const JSONSECREATE = require("../config")

// async function adminAuth(req,res,next){
//     const username = req.headers.username;
//     const password = req.headers.password;
//     console.log(username)
//     const adminFound = await Admin.findOne({name:username});
//     console.log(adminFound)
//     const passwordMatch = await bcrypt.compare(password,adminFound.password)

//     if (adminFound && passwordMatch)
//     {
//         req.username = username;
//         req.password = password; 
//         next()
//     }
//     else
//     {
//         res.json({message: "Invalid Username/passoword"})
//     }

// }


async function adminAuth(req,res,next){
    const token = req.headers.token;

    if(!token)
    {
        return res.json({message:"Provide valid token"})
    }
    try{
        const user = jwt.verify(token,JSONSECREATE)
        req.username = user.username;
        next();
    }
    catch (err) {
        res.json({message:"Error Invalid token"
        })
    }

}

module.exports = adminAuth;