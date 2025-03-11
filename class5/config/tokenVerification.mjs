import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenVerification = (req, res, next) => {
  try {
    if (req.headers?.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        next();
      } else {
        res.status(401).send({ status: 401, message: "Unauthorize Access" });
      }
    } else {
      res.status(401).send({ status: 401, message: "Unauthorize Access" });
    }
  } catch (err) {
    res
      .status(401)
      .send({ err: err, status: 401, message: "Unauthorize Access" });
  }
};
export default tokenVerification;

// fetch("url",{
//     headers:{
//         "Authorization": "Barear Token"
//     }
// })
