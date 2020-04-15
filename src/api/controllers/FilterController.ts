import { Request, Response } from "express";
import Project from "../models/Project";

class FilterController {
  async index(req: Request, res: Response): Promise<Response> {
    const { filter } = req.query;

    if (!filter) {
      return res.status(500).json({ err: "no project availabe when filter" });
    }

    const projectWithFilter = await Project.find({ "tag.name": filter });

    return res.json({ filter_data: projectWithFilter });
  }
}

export default new FilterController();
