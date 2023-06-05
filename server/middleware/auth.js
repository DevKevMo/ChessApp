import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

const auth = (req, res, next) => {
  // Get the token from the request headers, cookies, or local storage (whichever you prefer)
  const token =
    req.headers.authorization ||
    req.cookies.token ||
    localStorage.getItem("token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token found, authorization denied." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET);

    // Attach the user data to the request object for future use
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = auth;
