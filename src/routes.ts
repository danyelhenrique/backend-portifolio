import { Router } from "express";
import userController from "./api/controllers/userController";
import sessionController from "./api/controllers/sessionController";
import projectController from "./api/controllers/projectController";

import auth from "./api/middlewares/auth";

const router = Router();

router.get("/", (req, res) => res.json({ msg: "Server is Running" }));

router.post("/signin", sessionController.store);
router.post("/users", userController.store);

router.use(auth);
router.get("/users", userController.show);
router.put("/users", userController.update);
router.delete("/users", userController.destroy);

router.get("/users/projects", projectController.index);
router.get("/users/projects/:id", projectController.show);
router.post("/users/projects", projectController.store);
router.put("/users/projects/:id", projectController.update);
router.delete("/users/projects/:id", projectController.destroy);

export default router;
