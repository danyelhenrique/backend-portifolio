import { IUser } from "./src/api/models/User";
import { Request } from "express";

import mongoose from "mongoose";

declare module "*";

declare global {
  namespace Express {
    interface Request {
      body: IUser;
      userId: mongoose.Types.ObjectId;
    }
  }
}
