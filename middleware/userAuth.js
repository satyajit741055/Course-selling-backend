const { User } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JSONSECREATE = require("../config")



// async function userAuth(req,res,next){
//     const username = req.headers.username;
//     const password = req.headers.password;
    
//     const userFound = await User.findOne({name:username});

//     if (!userFound) {
//         return res.status(401).json({ message: "Invalid Username/Password" });
//     }


//     const passwordMatch = await bcrypt.compare(password,userFound.password)

//     if (userFound && passwordMatch)
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

async function userAuth(req,res,next){
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

module.exports = userAuth;