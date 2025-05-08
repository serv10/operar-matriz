import axios, { HttpStatusCode } from "axios";

// URL de la API en Node.js
import { NODE_API_URL } from "../configs/config.ts";
import type { FactorizacionResponse } from "../interfaces/factorizacion-response.interface.ts";

export const obtenerFactorizacionQR = async (
  matriz: number[][],
  token: string,
): Promise<[Error?, FactorizacionResponse?]> => {
  try {
    // Realiza la solicitud POST a la API de Node.js
    const response = await axios.post(
      `${NODE_API_URL}/factorizacion`,
      {
        matriz,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Reemplaza 'token' por el valor real del JWT
        },
      },
    );

    // Verifica si la respuesta es exitosa sino devolvemos un array con un error
    if (response.status !== HttpStatusCode.Ok) {
      return [new Error("Error al obtener la factorización QR")];
    }

    // Devolvemos null como error y los datos de la respuesta
    return [null, response.data as FactorizacionResponse];
  } catch (error) {
    // Verificaremos el tipo del error y devolveremos un array con el error
    if (axios.isAxiosError(error)) {
      return [
        new Error(
          `${error.response?.data.message ?? `Error de red: no se pudo conectar con la API (${error.message})`}`,
        ),
      ];
    } else if (error instanceof Error) {
      return [new Error(`${error.message}`)];
    } else {
      return [new Error(`Error desconocido`)];
    }
  }
};
