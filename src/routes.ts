import { Router } from "express";
import userController from "./api/controllers/userController";
import sessionController from "./api/controllers/sessionController";
import auth from "./api/middlewares/auth";

const router = Router();

router.post("/", (req, res) => res.json({ ok: true }));

router.post("/signin", sessionController.store);
router.post("/users", userController.store);

router.use(auth);
router.get("/users", userController.show);
router.put("/users", userController.update);

export default router;
