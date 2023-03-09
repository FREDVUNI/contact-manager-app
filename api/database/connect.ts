import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({path:'.env'})

const connect = async () =>{
    try{
        mongoose.set('strictQuery',false);
       await mongoose.connect(process.env.MONGO_URI!,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
       }) 
       console.log('connected to database.')
    }
    catch(error){
        console.log(error.message)
    }
}

export default connect