import { Response } from "express";

import type { ErrorResponse } from "../interfaces/error-response.interface";

// Esta función se utiliza para enviar una respuesta de error al cliente.
export function responderError(
  res: Response,
  statusCode: number,
  message: string,
  path: string,
  method: string,
) {
  const errorResponse: ErrorResponse = {
    message,
    path,
    method,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(errorResponse);
}
