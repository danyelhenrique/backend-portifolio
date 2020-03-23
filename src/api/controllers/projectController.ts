import { Request, Response } from "express";
import Project from "../models/Project";

class ProjectController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const project = await Project.create(req.body);

      return res.json({ project });
    } catch (error) {
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

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
      return res.status(500).json({ err: "Failed to create " });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const project = await Project.find();

      return res.json({ project });
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
