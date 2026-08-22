import { Router } from "express";
import { photoUpload } from "../config/uploads";
import { AuthController } from "../controllers/AuthController";
import { CartController } from "../controllers/CartController";
import { UserController } from "../controllers/UserController";
import { VariantController } from "../controllers/VariantController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateCreateVariant, validateRegister, validateUpdateVariant } from "../middlewares/validateMiddleware";

const router = Router();

/*Auth routes*/
router.post("/auth/register", validateRegister, AuthController.register);
router.post("/auth/login", AuthController.login);

/*UserController*/
router.get("/user",authMiddleware,UserController.readUser);
router.get("/user/many",UserController.readAllUsers);
router.put("/user",authMiddleware,UserController.updateUser);
router.post("/user/profpic",authMiddleware,photoUpload.single('photo'),UserController.setProfPicUser);
router.delete("/user",authMiddleware,UserController.deleteUser);

/*CartController*/
router.post("/cart", authMiddleware, CartController.createCart);
router.get("/cart", authMiddleware, CartController.readCart);
router.put("/cart", authMiddleware, CartController.updateCart);
router.delete("/cart/clear", authMiddleware, CartController.deleteAllItemsInCart);
/*Variant Controller*/
router.post("/variant", authMiddleware, validateCreateVariant, VariantController.createVariant);
router.get("/variant/:id", VariantController.readVariant);
router.get("/product/:productId/variants", VariantController.readVariantsByProduct);
router.put("/variant/:id", authMiddleware, validateUpdateVariant, VariantController.updateVariant);
router.delete("/variant/:id", authMiddleware, VariantController.deleteVariant);

export default router;