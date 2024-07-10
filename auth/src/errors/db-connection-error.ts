import { ValidationError } from "express-validator";

export class DBConnectionError extends Error {
  reason = "Error connecting to db";
  constructor() {
    super();

    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }
}
