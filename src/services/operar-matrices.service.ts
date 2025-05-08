import {
  promedioEntreMatrices,
  sumaEntreMatrices,
  valorMaximoEntreMatrices,
  valorMinimoEntreMatrices,
  verificarMatricesDiagonales,
} from "./operaciones.service";
import type { OperacionesResponse } from "../interfaces/operaciones-response.interface";
import { redondear } from "../utils/matematica.util";

export const operarMatrices = (
  matrizQ: number[][],
  matrizR: number[][],
): [Error?, OperacionesResponse?] => {
  try {
    // Ahora que tenemos Q y R, podemos realizar operaciones sobre ellas
    const valorMaximo = valorMaximoEntreMatrices(matrizQ, matrizR);
    const valorMinimo = valorMinimoEntreMatrices(matrizQ, matrizR);
    const suma = sumaEntreMatrices(matrizQ, matrizR);
    const promedio = promedioEntreMatrices(matrizQ, matrizR);
    const { esQDiagonal, esRDiagonal } = verificarMatricesDiagonales(
      matrizQ,
      matrizR,
    );

    // Devolvemos un array con null para error y los resultados de las operaciones.
    // Los valores numéricos son redondeados a 10 decimales
    return [
      undefined,
      {
        valorMaximo: redondear(valorMaximo, 10),
        valorMinimo: redondear(valorMinimo, 10),
        suma: redondear(suma, 10),
        promedio: redondear(promedio, 10),
        esQDiagonal,
        esRDiagonal,
      },
    ];
  } catch (error) {
    if (error instanceof Error) {
      // Si el error es una instancia de Error, lo lanzamos
      return [error];
    } else {
      // Si el error no es una instancia de Error, lanzamos un error genérico
      return [new Error("Error desconocido")];
    }
  }
};
