import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routerFrases from "./routes/routerFrases.js"
import connectDB from "./database/connectDatabase.js"

dotenv.config()



  const port = process.env.MONGO_PORT

  const corsOptions = {
    origin: ['https://motiva-me.netlify.app', 'https://motiva-me.com.br'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se você precisar de suporte a cookies
  };

  const app = express()
  app.use(express.json())
  app.use(cors(corsOptions))
 
app.use("/api",routerFrases)
app.use("/", (req,res)=>{
  res.json({
    status:"OK"
  })
})



  connectDB()


app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})