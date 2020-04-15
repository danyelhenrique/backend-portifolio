import { Request, Response } from "express";
import mongoose from "mongoose";

import bcrypt from "bcrypt";

import User from "../models/User";

interface IPayload {
  _id: mongoose.Types.ObjectId;
  name: String;
  email: String;
}

interface IRequest extends Request {
  userId?: IPayload | mongoose.Types.ObjectId;
}

class UserController {
  async store(req: IRequest, res: Response): Promise<Response> {
    try {
      const { name, avatar_url, email, password } = req.body;

      const password_hash = bcrypt.hashSync(password, 8);

      const user = await User.create({
        name,
        avatar_url,
        email,
        password: password_hash,
      });

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async update(req: IRequest, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $set: { ...data } },
        { new: true }
      );

      if (!user) {
        return res.status(500).json({ err: "Failed to update " });
      }

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ err: "Failed to update " });
    }
  }

  async show(req: IRequest, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(500).json({ err: "Failed to show " });
      }

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ err: "Failed to Show " });
    }
  }

  async destroy(req: IRequest, res: Response): Promise<Response> {
    try {
      const user = await User.findOneAndRemove({ _id: req.userId });

      if (!user) {
        return res.status(500).json({ err: "Fail to destroy" });
      }

      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ err: "Failed to destroy " });
    }
  }
}

export default new UserController();
