import { Application, Router } from "express";

import { generarTokens, refreshToken } from "../controllers/auth.controller";

const router = Router();

router.post("/token", generarTokens as Application);
router.post("/refresh", refreshToken as Application);

export default router;
