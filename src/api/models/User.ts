import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser {
  name: String;
  avatar_url: String;
  email: String;
  password: String;
}

export interface IUserSchema extends Document, IUser {}

const defaultAvatar =
  "https://m.media-amazon.com/images/M/MV5BZDY2Nzk5MGMtMTVjZS00MGUxLTk1YjQtNTFiYWJiYjc0YjYzXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_UY268_CR116,0,182,268_AL_.jpg";

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    avatar_url: {
      type: String,
      required: true,
      default: defaultAvatar
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      select: false,
      required: true
    }
  },
  { timestamps: true }
);

export default model<IUserSchema>("User", UserSchema);
