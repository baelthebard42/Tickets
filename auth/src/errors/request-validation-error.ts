import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[]) {
    super("Db error");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  statusCode = 405;

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
