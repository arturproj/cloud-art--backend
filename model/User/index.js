import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model("user", userSchema);
/**
 * Save user document into collection
 * @param {string} email
 * @param {string} password
 * @param {string} token
 * @returns
 */
export function addUser(email, password, token) {
  //
  return User.create({
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password,
    token,
  });
}

/**
 * Find single user from collection
 * @param {object} query
 * @returns {object|null} user
 */
export function getUser(query) {
  return User.findOne(query);
}

export default User;
