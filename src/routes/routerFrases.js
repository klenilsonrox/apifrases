import { Router } from "express";
import { addFrase, deleteFrase, getAllFrases, home, updateFrase } from "../controllers/FrasesController.js";

const router = Router()

router.get("/", home)
router.get("/frases", getAllFrases)
router.post("/frases",addFrase )
router.delete("/frases/:id", deleteFrase)
router.put("/frases/:id", updateFrase)



export default router