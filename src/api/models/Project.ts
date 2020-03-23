import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: String;
  description: String;
  background_url: String;
  deploy_url: String;
  github_url: String;
  tag: String[];
}

const Project = new Schema({
  title: String,
  description: String,
  background_url: String,
  deploy_url: String,
  github_url: String,
  tag: [
    {
      type: String
    }
  ]
});

export default model<IProject>("Project", Project);
