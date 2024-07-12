import { RequestValidationError } from "./request-validation-error";

export abstract class CustomError extends Error {
  abstract statusCode: number; // this is how statuscode should be defined

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[]; //this is how the serializeError should return its data (return type)
}
