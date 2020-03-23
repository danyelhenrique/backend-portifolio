import { Request, Response } from "express";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/User";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(500).json({ err: "Fail to sigin" });
      }

      const user_password = String(user.password);

      const checkPassword = bcrypt.compareSync(password, user_password);

      if (!checkPassword) {
        return res.status(403).json({ err: "Fail to sigin" });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      const token = jwt.sign(payload, "secret", { expiresIn: "7d" });

      return res.json({ user, token });
    } catch (error) {
      return res.status(500).json({ err: "Failed to sigin " });
    }
  }
}

export default new SessionController();
