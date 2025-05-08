import { Application, Router } from "express";

import analizarMatriz from "./analizar-matriz.route";
import authRouter from "./auth.route";
import authJWT from "../middlewares/auth-jwt.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/analizar-matriz", authJWT as Application, analizarMatriz);

export default router;
