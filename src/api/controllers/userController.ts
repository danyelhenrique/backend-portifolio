import { Request, Response, IRoute } from "express";
import mongoose from "mongoose";

import bcrypt from "bcrypt";

import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      body: IUser;
      userId: mongoose.Types.ObjectId;
    }
  }
}

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name, avatar_url, email, password } = req.body;

      const password_hash = bcrypt.hashSync(password, 8);

      const user = await User.create({
        name,
        avatar_url,
        email,
        password: password_hash
      });

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const hasUser = await User.findById(req.userId);
      if (!hasUser) {
        return res.status(500);
      }

      const user = hasUser.update(data);

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.userId);

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ err: "Failed to Show " });
    }
  }
}

export default new UserController();
