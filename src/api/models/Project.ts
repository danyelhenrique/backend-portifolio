import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: String;
  description: String;
  background_url: String;
  deploy_url: String;
  github_url: String;
  tag: ITag[];
}

export interface ITag extends Document {
  name: String;
  _id: Schema.Types.ObjectId;
}

export type TProject = Document & {
  title: String;
  description: String;
  background_url: String;
  deploy_url: String;
  github_url: String;
  tag: ITag[];
};

export type TTag = ITag & Document;

export type TProjectWithTag = Document & TProject & TTag[];

const TagSchema = new Schema(
  {
    name: { type: String }
  },
  { timestamps: true }
);

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    background_url: {
      type: String,
      required: true
    },
    deploy_url: String,
    github_url: String,
    tag: [TagSchema]
  },
  { timestamps: true }
);

const Project = model<TProjectWithTag>("Project", ProjectSchema);

const Tag = model<TTag>("Tag", TagSchema);

export default Project;

export { Tag, Project };
