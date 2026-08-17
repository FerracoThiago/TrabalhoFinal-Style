import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRegister } from "../middlewares/validateMiddleware";

const router = Router();

/*Auth routes*/
router.post("/auth/register", validateRegister, AuthController.register);
router.post("/auth/login", AuthController.login);

/*UserController*/
router.get("/user",authMiddleware,UserController.readUser);
router.get("/user/many",UserController.readAllUsers);
router.post("/user",authMiddleware,UserController.updateUser);
router.delete("/user",authMiddleware,UserController.deleteUser);

