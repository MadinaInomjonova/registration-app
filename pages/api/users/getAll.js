import jsonwebtoken from "jsonwebtoken";
import { userModel } from "../_db";

export default async function handler(req, res) {
  return await new Promise((resolve) => {
    if (req.method === "GET") {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (token === undefined) {
        res
          .status(401)
          .json({ message: "Token is not given or invalid format" });
      } else {
        const valid = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if (valid && valid.isActive && valid.isAdmin) {
          try {
            userModel
              .find({}, (err, result) => {
                res.status(200).json({ users: result })
              })

          } catch (error) {
            res.status(503).json({ message: error });
          }
        } else {
          res.status(401).json({ message: "Token is not valid, or you have been Blocked by Admins :(" });
          return resolve("smth went wrong");
        }
      }
    } else {
      res.status(501).json({ message: "☹️" });
    }
  });
}
