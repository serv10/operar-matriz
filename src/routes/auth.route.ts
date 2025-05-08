import { Router } from "express";

import { generarTokens, refreshToken } from "../controllers/auth.controller.ts";

const router = Router();

router.post("/token", generarTokens);
router.post("/refresh", refreshToken);

export default router;
