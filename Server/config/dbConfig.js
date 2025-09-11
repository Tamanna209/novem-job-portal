const mongoose=require("mongoose");

const DB_URL=process.env.DB_URL;

const dbConnectiviy=async()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log('Database connected succefuly');
        return mongoose.connection;

        
    }catch(err){
        console.log('Connection failed', err);
        
    }
}

module.exports=dbConnectiviy;