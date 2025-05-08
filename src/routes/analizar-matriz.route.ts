import { Application, Router } from "express";

import { analizarMatriz } from "../controllers/analizar-matriz.controller";

const router = Router();

router.post("/", analizarMatriz as Application);

export default router;
