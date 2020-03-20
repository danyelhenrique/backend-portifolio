import absController from "../api/controllers/absController;

declare global {
  namespace NodeJS {
    interface Global {
      AbsController: absController
    }
  }
}
