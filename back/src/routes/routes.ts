import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRegister } from "../middlewares/validateMiddleware";
/*import { authMiddleware } from "../middlewares/authMiddleware";*/

const router = Router();

router.post("/auth/register", validateRegister, AuthController.register);
router.post("/auth/login", AuthController.login);