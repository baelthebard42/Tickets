import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt); // converting callback implementation to promise based implementation

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex"); // makes the password unique even if two users have same password
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer; // hash input password using same salt as the one used while signup process

    return buf.toString("hex") === hashedPassword;
  }
}
