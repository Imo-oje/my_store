import { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    res.status(error.statuscode).json({
      message: error.message,
    });
  }
};
