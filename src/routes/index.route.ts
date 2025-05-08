import { Router } from "express";

import analizarMatriz from "./analizar-matriz.route.ts";
import authRouter from "./auth.route.ts";

const router = Router();

router.use("/auth", authRouter);
router.use("/analizar-matriz", analizarMatriz);

export default router;
