import { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
import { ZodError } from "zod";
import { INTERNAL_SERVER_ERROR } from "../constants/HttpStatusCode";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("UNHANDLED_ERROR: ", error);

  if (error instanceof AppError) {
    res.status(error.statuscode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path,
      })),
    });
  }
};
