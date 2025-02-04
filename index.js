const express = require("express")
const bodyParser = require('body-parser');
const app = express()
const adminRouter = require("./routes/adminRoutes")
const userRouter = require("./routes/userRoutes")


app.use(bodyParser.json());

app.use("/admin",adminRouter)
app.use("/user",userRouter)

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});