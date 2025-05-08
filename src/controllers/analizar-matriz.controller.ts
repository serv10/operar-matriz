import { HttpStatusCode } from "axios";

import { obtenerFactorizacionQR } from "../apis/factorizacion-qr.api.ts";
import type { AnalizarMatrizResponse } from "../interfaces/analizar-matriz-response.interface.ts";
import { operarMatrices } from "../services/operar-matrices.service.ts";
import { estaPoblada } from "../utils/matriz.util.ts";
import { extraerToken } from "../utils/token.utils.ts";

export const analizarMatriz = async (req, res) => {
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
  const { matrizQ, matrizR } = respFactorizacion;

  // Obtenemos el error y la respuesta de las operaciones
  const [errOperaciones, respOperaciones] = operarMatrices(matrizQ, matrizR);

  // Verificamos si hubo un error al realizar las operaciones
  if (errOperaciones) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: errFactorizacion.message });
  }

  // Creamos un objeto con los resultados de las operaciones
  const response: AnalizarMatrizResponse = {
    valorMaximo: respOperaciones.valorMaximo,
    valorMinimo: respOperaciones.valorMinimo,
    suma: respOperaciones.suma,
    promedio: respOperaciones.promedio,
    esQDiagonal: respOperaciones.esQDiagonal,
    esRDiagonal: respOperaciones.esRDiagonal,
    matrizQ,
    matrizR,
  };

  // Devolvemos el objeto como respuesta
  return res.json(response);
};
