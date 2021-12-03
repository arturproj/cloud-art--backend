import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const DEFAULT_EXPIRATION = "1h";
/**
 * Creator token signed with jsonwebtoken
 * @param {string} email user
 * @param {number|string} expiresIn time
 * @returns {string} token
 */
export const createToken = (email, expiresIn = DEFAULT_EXPIRATION) =>
  jwt.sign(
    { email }, // value for token
    process.env.SECRET_KEY, // encryption key
    { expiresIn } // expire time ex: 1 hours
  );

const DEFAULT_PSWD_SALT = 16;
/**
 *
 * @param {string} password
 * @param {number|string} salt
 * @returns {string} encryptedPassword
 */
export const encryptionPasswords = (password, salt = DEFAULT_PSWD_SALT) =>
  bcrypt.hash(password, salt);

/**
 *
 * @param {sting} token_string
 * @returns {object}
 */
export const authenticateToken = (token_string) =>
  jwt.verify(token_string, process.env.SECRET_KEY, (err, user) => ({
    err,
    user,
  }));
