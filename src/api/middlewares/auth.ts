import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import { promisify } from "util";

interface IPayload {
  id: mongoose.Types.ObjectId;
  name: String;
  email: String;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Fail to authenticate" });
  }
  const [, token] = authHeader.split(" ");

  const jwtAsync = promisify(jwt.verify);

  try {
    const decoded = await jwtAsync(token, "secret");

    req.userId = (<IPayload>decoded).id;

    return next();
  } catch (error) {
    return res.status(401).json({ err: "Token is invalid" });
  }
};
