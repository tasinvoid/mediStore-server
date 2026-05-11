import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Internal Server Error";
  let errorDetails = err;

  // 1. Prisma Known Request Errors (Database Constraints)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = 400;
        errorMessage = "Input value is too long for the column.";
        break;
      case "P2002":
        statusCode = 409;
        errorMessage = `Duplicate entry: ${err.meta?.target} already exists.`;
        break;
      case "P2025":
        statusCode = 404;
        errorMessage = "The requested record was not found.";
        break;
      case "P2003":
        statusCode = 400;
        errorMessage =
          "Foreign key constraint failed. Related record not found.";
        break;
      default:
        statusCode = 400;
        errorMessage = `Database Error: ${err.code}`;
    }
  }

  // 2. Prisma Validation Errors (Schema mismatch)
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Invalid data provided. Please check the fields and types.";
  }

  // 3. Prisma Connection/Initialization Errors
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    errorMessage = "Unable to connect to the database.";
  }

  // 4. Express/Node Standard Errors (e.g., SyntaxError in JSON body)
  else if (err instanceof SyntaxError && "body" in err) {
    statusCode = 400;
    errorMessage = "Invalid JSON syntax in request body.";
  }

  // 5. JWT or Authentication Errors (Optional: যদি ব্যবহার করেন)
  else if (
    err.name === "UnauthorizedError" ||
    err.name === "JsonWebTokenError"
  ) {
    statusCode = 401;
    errorMessage = "Invalid or expired token.";
  }

  // Final Response Format
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      details: errorDetails,
    }),
  });
}
