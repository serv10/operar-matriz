export const concatenar = (matriz1: number[][], matriz2: number[][]) =>
  matriz1.concat(matriz2);

export const aplanar = (matriz: number[][]) => matriz.flat();

export const valorMaximo = (matriz: number[]) => Math.max(...matriz);

export const valorMinimo = (matriz: number[]) => Math.min(...matriz);

export const sumarValores = (matriz: number[]) =>
  matriz.reduce((acc, valor) => acc + valor, 0);

export const promediarValores = (matriz: number[]) =>
  sumarValores(matriz) / matriz.length;

export const esCuadrada = (matriz: number[][]) =>
  matriz.every((fila) => fila.length === matriz.length);

export const esDiagonal = (matriz: number[][]) =>
  matriz.every((fila, i) =>
    fila.every((valor, j) => (i === j ? valor !== 0 : valor === 0)),
  );

export const esMatriz = (val: unknown) => {
  return (
    Array.isArray(val) &&
    val.every(
      (fila) =>
        Array.isArray(fila) && fila.every((elem) => typeof elem === "number"),
    )
  );
};

export const estaPoblada = (val: unknown): val is number[][] =>
  esMatriz(val) && val.length > 0;
