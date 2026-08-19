import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRegister } from "../middlewares/validateMiddleware";
import { CartController } from "../controllers/CartController";

const router = Router();

/*Auth routes*/
router.post("/auth/register", validateRegister, AuthController.register);
router.post("/auth/login", AuthController.login);

/*UserController*/
router.get("/user",authMiddleware,UserController.readUser);
router.get("/user/many",UserController.readAllUsers);
router.put("/user",authMiddleware,UserController.updateUser);
router.delete("/user",authMiddleware,UserController.deleteUser);

/*CartController*/
router.post("/cart", authMiddleware, CartController.createCart);
router.get("/cart", authMiddleware, CartController.readCart);
router.put("/cart", authMiddleware, CartController.updateCart);
router.delete("/cart/clear", authMiddleware, CartController.deleteAllItemsInCart);

export default router;