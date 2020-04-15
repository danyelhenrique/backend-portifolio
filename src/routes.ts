import { Router } from "express";
import userController from "./api/controllers/userController";
import sessionController from "./api/controllers/sessionController";
import projectController from "./api/controllers/projectController";
import tagController from "./api/controllers/tagController";

import SearchController from "./api/controllers/SearchController";
import FilterController from "./api/controllers/FilterController";

import auth from "./api/middlewares/auth";

const router = Router();

router.get("/", (req, res) => res.json({ msg: "Server is Running" }));

router.post("/signin", sessionController.store);
router.get("/verify", sessionController.show);

router.post("/users", userController.store);

router.get("/users/projects", projectController.index);

router.use(auth);
router.get("/users", userController.show);
router.put("/users", userController.update);
router.delete("/users", userController.destroy);

router.get("/users/projects/tags", tagController.index);

router.get("/users/projects/:id", projectController.show);
router.put("/users/projects/:id", projectController.update);
router.delete("/users/projects/:id", projectController.destroy);
router.post("/users/projects", projectController.store);

router.get("/search", SearchController.index);
router.get("/filter", FilterController.index);

export default router;
