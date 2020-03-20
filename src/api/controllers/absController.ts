import { Request, Response } from "express";

abstract class AbsController {
  abstract async store(req: Request, res: Response): Promise<Response>;
  abstract async update(req: Request, res: Response): Promise<Response>;
  abstract async destroy(req: Request, res: Response): Promise<Response>;

  abstract async show(req: Request, res: Response): Promise<Response>;
  abstract async index(req: Request, res: Response): Promise<Response>;
}

export default AbsController;