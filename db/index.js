const mongoose = require("mongoose")
const Schema = mongoose.Schema;

async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://satyajit:Yb40MXQrRc9@cluster0.sjgqc.mongodb.net/course-selling-app");
        console.log("Connection Successful");
    }
    catch(err)
    {
        console.error("Error Found: "+err)
        throw new Error("Error found: ");
    }
}
connectDB();

const AdminSchema = new Schema({
    name: String,
    password: String
})

const UsersSchema = new Schema({
    name: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CoursesSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
})

const Admin = mongoose.model('Admin',AdminSchema)
const User = mongoose.model('User',UsersSchema)
const Course = mongoose.model('Course',CoursesSchema)


module.exports = {
    Admin,
    User,
    Course
}


