import jwt from "jsonwebtoken";

export const authenicate = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }
    console.log("Received Token:", token);
    console.log("here before jwt");
    const decoded=jwt.decode(token)
    
    if (decoded?.exp < Math.floor(Date.now() / 1000)) {
      return res.status(403).json({ error: "Token has expired." });
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err.name, "-", err.message);
        return res.status(403).json({ error: "Invalid or expired token." });
      }
      req.user = user; // Store user info in request
      console.log("Passed jwt",user);
      next();


    });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).json({ error: "Internal Server Error in authentication." });
  }
};
