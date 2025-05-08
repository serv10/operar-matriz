import { Router } from "express";

import { analizarMatriz } from "../controllers/analizar-matriz.controller.ts";
import authJWT from "../middlewares/auth-jwt.middleware.ts";

const router = Router();

router.post("/", authJWT, analizarMatriz);

export default router;
