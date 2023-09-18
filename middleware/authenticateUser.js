import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateUser = async (req, res, next) => {
  const cookies = req.cookies.token;
  try {
    if (cookies) {
      const decode = jwt.verify(cookies, process.env.JWT_KEY);
      if (!decode) {
        return res.status(401).send("Acess denied. No token provided.");
      }
      req.token = decode;
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

export default authenticateUser;
