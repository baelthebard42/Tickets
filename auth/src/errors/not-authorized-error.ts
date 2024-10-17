import { CustomError } from "./custom-errors";

export class NotAuthorizedError extends CustomError {
  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  statusCode = 401;

  serializeErrors() {
    return [{ message: "You are not authorized]" }];
  }
}
