const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const cors=require("cors");
const PORT=process.env.PORT;
const dbConnectiviy=require("./config/dbConfig");
//middleware
app.use(cors(
    {
        origin:["https://job-portal-by-novem.onrender.com/", "http://localhost:8080"],
        credentials:true
    }
))
app.get("/", (req, res)=>{
    console.log("Hello");
    res.send("Welcome to our Job Portal")
})

app.listen(PORT, async()=>{
    await dbConnectiviy();
    console.log('Live URL is https://job-portal-by-novem.onrender.com/');
    
    console.log(`Server started at http://localhost:${PORT}`);
    
})