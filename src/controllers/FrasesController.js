import ServiceFrases from "../../services/ServicesFrases.js"

const serviceFrases = new ServiceFrases()



export const home = (req,res)=>{
    res.json({status:"OK"})
}

export const getAllFrases = async (req,res)=>{
    
    try{
        const frases = await serviceFrases.getAllFrasesS()
        return res.status(200).json(frases)
    }catch(error){
        res.status(400).json({erro: error.message})
    }
}



export const addFrase = async (req,res)=>{
    const {quote,author}= req.body
    try{
      if(!quote){
        res.status(400).json({message:"o frase deve ser preenchido"})
        return
      }
      if(!author){
        res.status(400).json({message:"o campo autor deve ser preenchido"})
        return
      }
      const result = await serviceFrases.addFraseS(req.body)
        return res.status(201).json(result)
    }
    catch(error){
        res.status(400).json({erro:error})
    }
}

export const updateFrase=async (req,res)=>{
    try{
        const existeFrase = await serviceFrases.getFraseById(req.params.id)
        if(existeFrase){
            await serviceFrases.updateFraseS(req.params.id, req.body)
            res.status(200).json(req.body)
        }
     } catch(error){
            res.status(400).json({erro:error})
        }
}

export const deleteFrase = async (req,res)=>{
    const {id}= req.params

    try{
        const existe = await serviceFrases.getFraseById(id)
        if(!existe){
            res.status(404).json({message:"frase nao foi encontrada"})
        }
        await serviceFrases.deleteFraseS(id)
        return res.status(200).json()
    
       
    }
    catch(error){
        res.status(400).json({erro:error})
    }
}



