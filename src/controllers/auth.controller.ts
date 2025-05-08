import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import { REFRESH_SECRET_KEY, SECRET_KEY } from "../configs/config";
import { responderError } from "../utils/respuesta-error.util";

export const generarTokens = (req: Request, res: Response) => {
  // Obtenemos el usuario del cuerpo de la solicitud
  const { usuario } = req.body;

  // Verificamos si tiene valor
  if (!usuario) {
    return responderError(
      res,
      401,
      "Usuario no proporcionado",
      req.path,
      req.method,
    );
  }

  // Generamos el token y el refresh token
  const token = jwt.sign({ usuario: usuario }, SECRET_KEY!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ usuario: usuario }, REFRESH_SECRET_KEY!, {
    expiresIn: "30d",
  });

  // Devolvemos el token y el refresh token
  res.json({
    token,
    refreshToken,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  // Obtenemos el refresh token del cuerpo de la solicitud
  const { refreshToken } = req.body;

  // Verificamos si el refresh token tiene valor
  if (!refreshToken) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "No se proporcionó el refresh token" });
  }

  // Verificamos el refresh token
  jwt.verify(
    refreshToken,
    REFRESH_SECRET_KEY!,
    (err: VerifyErrors | null, payload: string | JwtPayload | undefined) => {
      // Si el refresh token no es válido, devolvemos un error
      if (err) {
        return res
          .status(HttpStatusCode.Unauthorized)
          .json({ message: err.message });
      }

      // Verificamos si el payload es un objeto y tiene la propiedad "usuario"
      if (typeof payload === "object" && "usuario" in payload) {
        // Generamos un nuevo token
        const nuevoToken = jwt.sign({ usuario: payload.usuario }, SECRET_KEY!, {
          expiresIn: "15m",
        });

        return res.json({ token: nuevoToken });
      }

      return responderError(
        res,
        401,
        "El refresh token no es válido",
        req.path,
        req.method,
      );
    },
  );
};
