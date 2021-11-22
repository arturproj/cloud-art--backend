import express from "express";

import validateRequirements from "../../middleware/ValidateFrom";
import { addUser, getUser } from "../../model/User";
import { createToken, encryptionPasswords } from "../../helpers/utils";

var router = express.Router();

router.post("/", validateRequirements, async (req, res) => {
  const { email, password } = req.body;
  try {
    // get document if user already exist
    // validate if user exist in our database
    if (await getUser({ email })) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist. Please Login." });
    }

    //Encrypt user password
    const encryptedPassword = await encryptionPasswords(password);

    // minuts to expire
    const expiresIn = 60 * 60; // 1 hours

    // create a new token
    const token = createToken(email, expiresIn);

    // Save user document into collection
    const user = addUser(email, encryptedPassword, token);

    // return new user
    res.status(201).json({ success: true, email: user.email, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
});


export default router;
