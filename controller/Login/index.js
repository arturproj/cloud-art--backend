import express from "express";
import validateRequirements from "../../middleware/ValidateFrom";
import { getUser, updateUserToken } from "../../model/User";
import { createToken, encryptionPasswords } from "../../helpers/tokenUtils";

var router = express.Router();
router.post("/", validateRequirements, async (req, res) => {
  console.log("/login",  req.body)
  const { email, password } = req.body;

  try {
    // get document if user already exist
    const user = await getUser({ email });
    // validate if user exist in our database
    if (!user) {
      return (
        res
          // .status(409)
          .json({
            success: false,
            status: 409,
            message: "User is not found. Please sign up.",
          })
      );
    }

    //Encrypt user password
    const encryptedPassword = await encryptionPasswords(password);

    // validate if passwords is equals
    if (encryptedPassword !== user.password) {
      if (!user) {
        return (
          res
            // .status(203)
            .json({
              success: false,
              status: 203,
              message: "Wrong email or password. Please try again.",
            })
        );
      }
    }

    // minuts to expire
    const expiresIn = 60 * 60; // 1 hours

    // create a new token
    const token = createToken(email, expiresIn);
    console.log({
      success: true,
      status: 201,
      email: user.email,
      token: token,
    });
    // return new user
    res
      // .status(201)
      .json({ success: true, status: 201, email: user.email, token: token });

    // Save new token into document user
    updateUserToken(user._id, token).then((res) =>
      console.log("token updated", user._id, res)
    );
  } catch (err) {
    console.log(err);
    res
      // .status(500)
      .json({ success: false, status: 500, error: err });
  }
});

export default router;
