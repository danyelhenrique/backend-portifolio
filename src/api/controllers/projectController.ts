import { Request, Response } from "express";
import Project from "../models/Project";

class ProjectController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const data = { ...req.body };
      const formatedTag =
        data &&
        data.tag &&
        data.tag
          .trim()
          .toLowerCase()
          .split(",")
          .map((tag: string) => ({ name: tag }));

      data.tag = formatedTag;

      const project = await Project.create(data);

      return res.json({ project });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const data = { ...req.body };

      const formatedTag =
        data &&
        data.tag &&
        data.tag
          .trim()
          .toLowerCase()
          .split(",")
          .map((tag: string) => ({ name: tag }));

      data.tag = formatedTag;

      const project = await Project.findByIdAndUpdate(req.params.id, data, {
        new: true
      });

      return res.json({ project });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const project = await Project.findById(req.params.id);

      return res.json({ project });
    } catch (error) {
      return res.status(500).json({ err: "Failed to Show " });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const projects = await Project.find().sort({ createdAt: "desc" });

      return res.json({ projects });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const project = await Project.findOneAndRemove({ _id: req.params.id });

      return res.json({ project });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }
}

export default new ProjectController();
