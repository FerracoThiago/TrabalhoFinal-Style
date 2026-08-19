import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRegister } from "../middlewares/validateMiddleware";
import { VariantController } from "../controllers/VariantController";
import { validateCreateVariant, validateUpdateVariant } from "../middlewares/validateMiddleware";

const router = Router();

/*Auth routes*/
router.post("/auth/register", validateRegister, AuthController.register);
router.post("/auth/login", AuthController.login);

/*UserController*/
router.get("/user",authMiddleware,UserController.readUser);
router.get("/user/many",UserController.readAllUsers);
router.put("/user",authMiddleware,UserController.updateUser);
router.delete("/user",authMiddleware,UserController.deleteUser);

/*Variant Controller*/
router.post("/variant", authMiddleware, validateCreateVariant, VariantController.createVariant);
router.get("/variant/:id", VariantController.readVariant);
router.get("/product/:productId/variants", VariantController.readVariantsByProduct);
router.put("/variant/:id", authMiddleware, validateUpdateVariant, VariantController.updateVariant);
router.delete("/variant/:id", authMiddleware, VariantController.deleteVariant);

export default router;