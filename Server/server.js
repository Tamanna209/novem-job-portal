const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();

const PORT=process.env.PORT;

app.get("/", (req, res)=>{
    console.log("Hello");
    res.send("Welcome to our Job Portal")
})

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    
})