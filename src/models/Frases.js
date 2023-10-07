import mongoose from "mongoose";

const fraseSchema = new mongoose.Schema({
    quote:{
        type:String
    },
    author:{
        type:String
    }
})

const Frases = mongoose.model("Frases", fraseSchema)

export default Frases