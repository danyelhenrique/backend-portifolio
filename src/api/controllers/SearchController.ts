import { Request, Response } from "express";
import Project from "../models/Project";

class SearchController {
  async index(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ err: "Project not found" });
    }

    const title = name.trim().toLowerCase();

    if (!title) {
      return res.status(400).json({ err: "Project not found" });
    }

    const project = await Project.find({
      title: { $regex: title, $options: "i" }
    });

    if (!project || project.length <= 0) {
      return res.status(500).json({ err: "Project not found" });
    }

    return res.json({ project });
  }
}

export default new SearchController();
