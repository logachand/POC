const mongoose=require('mongoose')
const DB="mongodb://localhost:27017/Management"
const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(DB)
        console.log(`MongoDB Connect `);
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}    


module.exports=connectDB