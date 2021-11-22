const patternEmail = new RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);
const patternPassword = new RegExp(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/i);

export default function (req, res, next) {
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    return res
      .status(401)
      .json({ success: false, message: "All input is required" });
  }

  if (!patternEmail.test(email)) {
    return res
      .status(401)
      .json({ success: false, message: "Email not validated" });
  }

  // Validate type value input
  if (!patternPassword.test(password)) {
    return res
      .status(401)
      .json({ success: false, message: "Password not validated" });
  }

  return next();
}
