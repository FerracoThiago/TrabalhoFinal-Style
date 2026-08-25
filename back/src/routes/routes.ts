import { Router } from "express";
import { photoUpload } from "../config/uploads";
import { AuthController } from "../controllers/AuthController";
import { CartController } from "../controllers/CartController";
import { CouponController } from "../controllers/CouponController";
import { ProductController } from "../controllers/ProductController";
import { UserController } from "../controllers/UserController";
import { VariantController } from "../controllers/VariantController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateCreateProduct, validateUpdateProduct } from "../middlewares/productMiddleware";
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

/*Product Controller*/
router.post("/product", photoUpload.array("photos", 5), validateCreateProduct, ProductController.createProduct);
router.get("/product/:id", ProductController.readProduct);
router.get("/product", ProductController.readAllProducts);
router.put("/product/:id", validateUpdateProduct, ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);

/*Coupon Controller */
router.post("/coupon",CouponController.createCoupon);
router.get("/coupon/:couponId",CouponController.readCoupon);
router.get("/coupon",CouponController.readAllCoupons);
router.put("/coupon/:couponId",CouponController.updateCoupon);
router.put("/coupon2user", authMiddleware,CouponController.sendCouponToUser);
router.delete("/coupon/:couponId",CouponController.deleteCoupon);


export default router;