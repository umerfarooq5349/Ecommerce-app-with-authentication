import { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  status: string,
  message: string,
  data?: unknown
) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};
