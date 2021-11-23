import express from "express";
import validateRequirements from "../../middleware/ValidateFrom";
import { getUser, updateUserToken } from "../../model/User";
import { createToken, encryptionPasswords } from "../../helpers/utils";

var router = express.Router();
router.post("/", validateRequirements, async (req, res) => {
  const { email, password } = req.body;
  try {
    // get document if user already exist
    const user = await getUser({ email });
    // validate if user exist in our database
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User is not found. Please sign up.",
      });
    }

    //Encrypt user password
    const encryptedPassword = await encryptionPasswords(password);

    // validate if passwords is equals
    if (encryptedPassword !== user.password) {
      if (!user) {
        return res.status(203).json({
          success: false,
          message: "Wrong email or password. Please try again.",
        });
      }
    }

    // minuts to expire
    const expiresIn = 60 * 60; // 1 hours

    // create a new token
    const token = createToken(email, expiresIn);

    // Save new token into document user
    updateUserToken(user._id, token).then((res) =>
      console.log("token updated", res)
    );

    // return new user
    res.status(201).json({ success: true, email: user.email, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
});

export default router;
