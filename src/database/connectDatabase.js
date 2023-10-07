import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const DbUser = process.env.MONGO_USER
const DbPassword = process.env.MONGO_PASSWORD
const mongoDBURL = `mongodb+srv://${DbUser}:${DbPassword}@frases.uraafnh.mongodb.net`

const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}


const connectDB = async ()=>{
    await mongoose.connect(mongoDBURL,options)
    .then(()=>{
        console.log("Conectado ao MongoDB")
    })
    .catch((error)=>{
        console.error("Erro ao conectar ao MongoDB", error)
    })
}

export default connectDB