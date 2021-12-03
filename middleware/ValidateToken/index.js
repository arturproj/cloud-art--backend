import { authenticateToken } from "../../helpers/tokenUtils";

export default function (req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const validated = authenticateToken(token);

  console.log("validated", validated)

  return next();
}
