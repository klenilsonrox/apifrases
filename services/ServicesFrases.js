import Frases from "../src/models/Frases.js"




class ServiceFrases{
    constructor(){

    }

    async getAllFrasesS(){
        return await Frases.find()
    }

    async getFraseById(id){
        return Frases.findById(id)
    }

    async addFraseS(data){
        return await Frases.create(data)
    }

    async updateFraseS(id,data){
        return await Frases.findByIdAndUpdate(id,data)
    }

    async deleteFraseS(id){
        return await Frases.findByIdAndRemove(id)
    }
}

export default ServiceFrases