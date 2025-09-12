const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const app=express();
const cors=require("cors");
const PORT=process.env.PORT;
const dbConnectiviy=require("./config/dbConfig");
const userRoutes = require('./routes/users.route');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Novem Job Portal API',
    version: '1.0.0',
    description: 'API documentation for Novem Job Portal',
  },
  servers: [
    {
      url:[ "https://job-portal-by-novem.onrender.com/", "http://localhost:8080"],
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

//middleware
app.use(cors(
    {
        origin:["https://job-portal-by-novem.onrender.com/", "http://localhost:8080"],
        credentials:true
    }
))

app.use(express.json());

app.use('/api/user', userRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res)=>{
    console.log("Hello");
    res.send("Welcome to our Job Portal")
})

app.listen(PORT, async()=>{
    await dbConnectiviy();
    console.log(`Live URL is https://job-portal-by-novem.onrender.com/`);
    console.log(`Server started at http://localhost:${PORT}`);   
})
