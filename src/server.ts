import "./config/dotEnv";
import "./config/mongoDb";

import express, { Express } from "express";
import routes from "./routes";

class App {
  public app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(routes);
  }
}

export default new App();
