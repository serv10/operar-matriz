import type { FactorizacionResponse } from "./factorizacion-response.interface.ts";
import type { OperacionesResponse } from "./operaciones-response.interface.ts";

export interface AnalizarMatrizResponse
  extends FactorizacionResponse,
    OperacionesResponse {}
