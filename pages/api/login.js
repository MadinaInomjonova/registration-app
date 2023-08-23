import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dayjs from "dayjs";

import { userModel } from "./_db";

export default async function handler(req, res) {
  return await new Promise((resolve) => {
    if (req.method === "POST") {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: "Please, send needed params" });
      } else {
        void userModel
          .findOne({ username })
          .then((user) => {
            if (!user) {
              res
                .status(204)
                .json({ message: "User with given username not found" });
            } else {
              if (!bcrypt.compareSync(password, user.password)) {
                res.status(201).json({ message: "Password is incorrect" });
              } else {
                const accessToken = jsonwebtoken.sign(
                  {
                    id: user._id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    isActive: user.isActive,
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "3d",
                  },
                );
                const refreshToken = jsonwebtoken.sign(
                  { id: user._id },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: "7d" },
                );
                res.status(200).json({
                  message: "Welcome",
                  accessToken,
                  refreshToken,
                });
                const now = dayjs().format("YYYY-MM-DD | HH-mm-ss");
                userModel.findByIdAndUpdate(user._id, { lastLoginDate: now }, { new: false }, (err) => {
                  console.log(err, "Error");
                })
              }
            }
          })
          .catch(() => {
            res.status(503).json({ message: "Internal server error" });
            return resolve();
          });
      }
    } else if (req.method === "GET") {
      res.status(200).json({
        message: "You cannot get anything rahter then this message 😃",
      });
    } else {
      res.status(501).json({ message: "☹️" });
    }
  });
}
