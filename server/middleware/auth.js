import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

export const auth = (req, res, next) => {
  // Get the token from the request headers, cookies, or local storage (whichever you prefer)
  const token = req.body.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No cltoken found, authorization denied." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET);
    console.log(decoded);
    // Attach the user data to the request object for future use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      message: "Invalid token, authorization denied.",
    });
  }
};
