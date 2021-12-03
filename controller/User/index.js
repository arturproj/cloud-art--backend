import express from "express";
import { authenticateToken } from "../../helpers/tokenUtils";

var router = express.Router();

router.post("/token", (req, res) => {
  const { token } = req.body;

  try {
    // get document if user already exist
    // validate if user exist in our database
    if (token == null) {
      return res.status(401).json({
        success: false,
        message: "Token not found. Please try again.",
      });
    }

    var validationToken = authenticateToken(token);
    console.log("/token", validationToken);
    if (validationToken.user) {
      return (
        res
          // .status(201)
          .json({ success: true, ...validationToken })
      );
    } else {
      return (
        res
          // .status(403)
          .json({ success: false, ...validationToken })
      );
    }

    // return new user
  } catch (err) {
    console.log(err);
    res
      // .status(500)
      .json({ success: false, error: err.message });
  }
});

export default router;
