import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routerFrases from "./routes/routerFrases.js"
import connectDB from "./database/connectDatabase.js"

dotenv.config()

const allowedOrigins = [
    process.env.SITE_URL_1,
    process.env.SITE_URL_2,
    process.env.SITE_URL_3,
    process.env.SITE_URL_4,

  ];

  const port = process.env.MONGO_PORT

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Acesso não permitido por CORS'));
      }
    },
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