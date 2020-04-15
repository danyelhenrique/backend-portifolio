import { Response, Request } from "express";
import Project, { ITag, IProject } from "../models/Project";

class TagController {
  async index(req: Request, res: Response): Promise<Response> {
    const tagList = await Project.find().map((project) => {
      return {
        tag: project.map((ele: any) => ele.tag),
      };
    });

    function removeDuplicateNames(array: any[]) {
      let uniq: { [key: string]: string | boolean } = {};

      return array.filter((obj) => !uniq[obj.name] && (uniq[obj.name] = true));
    }

    const formatedTag = tagList.tag.flat();

    const tags = removeDuplicateNames(formatedTag);

    return res.json({ tags });
  }
}

export default new TagController();
