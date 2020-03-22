import { IUser } from "../api/models/User";
import { Request } from "express";

// export interface IGetUserAuthInfoRequest extends Request {
//   body: IUser; // or any other type
// }
export interface IGetUserAuthInfoRequest extends Request {
  body: IUser;
}

// declare global {
//   namespace Express {
//     export interface Request {
//       body: IUser;
//     }
//   }
// }
