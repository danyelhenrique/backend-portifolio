import { Schema, model, Document } from "mongoose";

interface IProject extends Document {
  title: String;
  description: String;
  background_ril: String;
  deploy_url: String;
  github_url: String;
  tag: [String];
}

const Project = new Schema({
  title: String,
  description: String,
  background_ril: String,
  deploy_url: String,
  github_url: String,
  tag: [String]
});

export default model<IProject>("Project", Project);
