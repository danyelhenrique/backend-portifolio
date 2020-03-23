import "./config/dotEnv";

import express, { Express } from "express";
import routes from "./routes";
import morganConfig from "./lib/morgan";

class App {
  public app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(morganConfig);
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(routes);
  }
}

export default new App();
