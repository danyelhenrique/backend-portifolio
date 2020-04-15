import { Response, Request } from "express";
import Project from "../models/Project";

class tagController {
  async index(req: Request, res: Response): Promise<Response> {
    const tagList = await Project.find().map(tag => ({
      tag: tag.map(ele => ele.tag)
    }));

    function removeDuplicateNames(array: any[]) {
      let uniq: { [key: string]: string | boolean } = {};

      return array.filter(obj => !uniq[obj.name] && (uniq[obj.name] = true));
    }

    const formatedTag = tagList.tag.flat();

    const tags = removeDuplicateNames(formatedTag);

    return res.json({ tags });
  }
}

export default new tagController();
