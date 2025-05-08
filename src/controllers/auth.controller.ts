import { HttpStatusCode } from "axios";
import jwt from "jsonwebtoken";

import { REFRESH_SECRET_KEY, SECRET_KEY } from "../configs/config.ts";
import { responderError } from "../utils/respuesta-error.util.ts";

export const generarTokens = (req, res) => {
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
  const token = jwt.sign({ usuario: usuario }, SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ usuario: usuario }, REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  // Devolvemos el token y el refresh token
  res.json({
    token,
    refreshToken,
  });
};

export const refreshToken = async (req, res) => {
  // Obtenemos el refresh token del cuerpo de la solicitud
  const { refreshToken } = req.body;

  // Verificamos si el refresh token tiene valor
  if (!refreshToken) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "No se proporcionó el refresh token" });
  }

  // Verificamos el refresh token
  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, payload) => {
    // Si el refresh token no es válido, devolvemos un error
    if (err) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: err.message });
    }

    // Generamos un nuevo token
    const nuevoToken = jwt.sign({ usuario: payload.usuario }, SECRET_KEY, {
      expiresIn: "15m",
    });

    // Devolvemos el nuevo token
    return res.json({ token: nuevoToken });
  });
};
