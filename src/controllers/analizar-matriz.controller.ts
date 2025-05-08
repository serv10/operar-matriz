import { HttpStatusCode } from "axios";
import { Request, Response } from "express";

import { obtenerFactorizacionQR } from "../apis/factorizacion-qr.api";
import type { AnalizarMatrizResponse } from "../interfaces/analizar-matriz-response.interface";
import { operarMatrices } from "../services/operar-matrices.service";
import { estaPoblada } from "../utils/matriz.util";
import { extraerToken } from "../utils/token.utils";

export const analizarMatriz = async (req: Request, res: Response) => {
  // Obtenemos la matriz del cuerpo de la solicitud
  const { matriz } = req.body;

  // Verificamos que tenga valor
  if (!matriz) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ error: "Matriz no proporcionada." });
  }

  // Validamos que la matriz sea un array y que no esté vacía
  if (!estaPoblada(matriz)) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ error: "Matriz Q está vacia." });
  }

  // Extraemos el token del encabezado de autorización
  const token = extraerToken(req.headers.authorization);
  if (!token) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "No se proporcionó el token" });
  }

  // Llamada a la función para obtener las matrices Q y R
  const [errFactorizacion, respFactorizacion] = await obtenerFactorizacionQR(
    matriz,
    token,
  );

  // Verificamos si hubo un error al realizar la factorización
  if (errFactorizacion) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: errFactorizacion.message });
  }

  // Obtenemos las matrices Q y R de la respuesta
  const { matrizQ, matrizR } = respFactorizacion!;

  // Obtenemos el error y la respuesta de las operaciones
  const [errOperaciones, respOperaciones] = operarMatrices(matrizQ, matrizR);

  // Verificamos si hubo un error al realizar las operaciones
  if (errOperaciones) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: errOperaciones.message });
  }

  // Creamos un objeto con los resultados de las operaciones
  const response: AnalizarMatrizResponse = {
    valorMaximo: respOperaciones!.valorMaximo,
    valorMinimo: respOperaciones!.valorMinimo,
    suma: respOperaciones!.suma,
    promedio: respOperaciones!.promedio,
    esQDiagonal: respOperaciones!.esQDiagonal,
    esRDiagonal: respOperaciones!.esRDiagonal,
    matrizQ,
    matrizR,
  };

  // Devolvemos el objeto como respuesta
  return res.json(response);
};
