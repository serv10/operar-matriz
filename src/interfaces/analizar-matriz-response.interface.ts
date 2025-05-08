import type { FactorizacionResponse } from "./factorizacion-response.interface";
import type { OperacionesResponse } from "./operaciones-response.interface";

export interface AnalizarMatrizResponse
  extends FactorizacionResponse,
    OperacionesResponse {}
