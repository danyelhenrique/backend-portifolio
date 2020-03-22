import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser {
  name: String;
  avatar_url: String;
  email: String;
  password: String;
}

export interface IUserSchema extends Document, IUser {}

const UserSchema: Schema = new Schema(
  {
    name: String,
    avatar_url: String,
    email: String,
    password: {
      type: String,
      select: false
    }
  },
  { timestamps: true }
);

export default model<IUserSchema>("User", UserSchema);
