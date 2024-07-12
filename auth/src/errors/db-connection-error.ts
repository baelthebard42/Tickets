import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class DBConnectionError extends CustomError {
  statusCode = 400;
  reason = "Error connecting to db";
  constructor() {
    super("Invalid login");

    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
