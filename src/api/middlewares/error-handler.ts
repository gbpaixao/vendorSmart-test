import { NextFunction, Request, Response } from "express";

export function errorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
};
