import {
  aplanar,
  concatenar,
  esCuadrada,
  esDiagonal,
  promediarValores,
  sumarValores,
  valorMaximo,
  valorMinimo,
} from "../utils/matriz.util.ts";

export const valorMaximoEntreMatrices = (
  matrizQ: number[][],
  matrizR: number[][],
) => {
  const matrizConcatenada = concatenar(matrizQ, matrizR);
  const matrizAplanada = aplanar(matrizConcatenada);
  return valorMaximo(matrizAplanada);
};

export const valorMinimoEntreMatrices = (
  matrizQ: number[][],
  matrizR: number[][],
) => {
  const matrizConcatenada = concatenar(matrizQ, matrizR);
  const matrizAplanada = aplanar(matrizConcatenada);
  return valorMinimo(matrizAplanada);
};

export const sumaEntreMatrices = (matrizQ: number[][], matrizR: number[][]) => {
  const matrizConcatenada = concatenar(matrizQ, matrizR);
  const matrizAplanada = aplanar(matrizConcatenada);
  return sumarValores(matrizAplanada);
};

export const promedioEntreMatrices = (
  matrizQ: number[][],
  matrizR: number[][],
) => {
  const matrizConcatenada = concatenar(matrizQ, matrizR);
  const matrizAplanada = aplanar(matrizConcatenada);
  return promediarValores(matrizAplanada);
};

export const verificarMatricesDiagonales = (
  matrizQ: number[][],
  matrizR: number[][],
) => {
  const esQDiagonal = esCuadrada(matrizQ) && esDiagonal(matrizQ);
  const esRDiagonal = esCuadrada(matrizR) && esDiagonal(matrizR);

  return {
    esQDiagonal,
    esRDiagonal,
  };
};
