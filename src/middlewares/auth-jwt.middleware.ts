import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../configs/config";
import { responderError } from "../utils/respuesta-error.util";
import { extraerToken } from "../utils/token.utils";

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  // Obtenemos el token del encabezado de autorización
  const token = extraerToken(req.headers.authorization);

  // Verificamos si el token tiene valor
  if (!token) {
    return responderError(
      res,
      401,
      "No se ha proporcionado un token de autorización",
      req.path,
      req.method,
    );
  }

  // Verificamos el token
  jwt.verify(token, SECRET_KEY!, (err, _payload) => {
    // Si el token no es válido, devolvemos un error
    if (err) {
      return responderError(res, 401, err.message, req.path, req.method);
    }

    next();
  });
};

export default authJWT;
