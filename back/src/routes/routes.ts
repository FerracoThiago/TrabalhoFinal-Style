import { Router } from "express";
import { photoUpload } from "../config/uploads";

import { AddressController } from "../controllers/AddressController";
import { AuthController } from "../controllers/AuthController";
import { CartController } from "../controllers/CartController";
import { CouponController } from "../controllers/CouponController";
import { OrderController } from "../controllers/OrderController";
import { ProductController } from "../controllers/ProductController";
import { ReviewController } from "../controllers/ReviewController";
import { UserController } from "../controllers/UserController";
import { VariantController } from "../controllers/VariantController";
import { WishlistController } from "../controllers/WishListController";

import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/productMiddleware";
import {
  validateCreateReview,
  validateUpdateReview,
} from "../middlewares/reviewMiddleware";
import {
  validateCreateVariant,
  validateRegister,
  validateUpdateVariant,
} from "../middlewares/validateMiddleware";

const router = Router();

/* Auth routes */
router.post("/auth/register", validateRegister, AuthController.register);
router.post("/auth/login", AuthController.login);

/* UserController */
router.get("/user", authMiddleware, UserController.readUser);
router.get("/user/many", UserController.readAllUsers);
router.put("/user", authMiddleware, UserController.updateUser);
router.post(
  "/user/profpic",
  authMiddleware,
  photoUpload.single("photo"),
  UserController.setProfPicUser
);
router.delete("/user", authMiddleware, UserController.deleteUser);

/* CartController */
router.post("/cart", authMiddleware, CartController.createCart);
router.get("/cart", authMiddleware, CartController.readCart);
router.put("/cart", authMiddleware, CartController.updateCart);
router.delete("/cart/clear", authMiddleware, CartController.deleteAllItemsInCart);

/* Variant Controller */
router.post(
  "/variant",
  authMiddleware,
  validateCreateVariant,
  VariantController.createVariant
);
router.get("/variant/:id", VariantController.readVariant);
router.get(
  "/product/:productId/variants",
  VariantController.readVariantsByProduct
);
router.put(
  "/variant/:id",
  authMiddleware,
  validateUpdateVariant,
  VariantController.updateVariant
);
router.delete(
  "/variant/:id",
  authMiddleware,
  VariantController.deleteVariant
);

/* Product Controller */
router.post(
  "/product",
  photoUpload.array("photos", 5),
  validateCreateProduct,
  ProductController.createProduct
);
router.get("/product/:id", ProductController.readProduct);
router.get("/product", ProductController.readAllProducts);
router.put("/product/:id", validateUpdateProduct, ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);
router.post(
  "/product/:id/image",
  photoUpload.array("photos", 5),
  ProductController.setProductImage
);

/* Coupon Controller */
router.post("/coupon", CouponController.createCoupon);
router.get("/coupon/:couponId", CouponController.readCoupon);
router.get("/coupon", CouponController.readAllCoupons);
router.put("/coupon/:couponId", CouponController.updateCoupon);
router.put(
  "/coupon2user",
  authMiddleware,
  CouponController.sendCouponToUser
);
router.delete("/coupon/:couponId", CouponController.deleteCoupon);

/* Address Controller */
router.post("/address", authMiddleware, AddressController.createAddress);
router.get("/address", authMiddleware, AddressController.readAddresses);
router.put("/address/:id", authMiddleware, AddressController.updateAddress);
router.delete("/address/:id", authMiddleware, AddressController.deleteAddress);

/* Order Controller */
router.post("/order", authMiddleware, OrderController.createOrder);
router.get("/order/:id", OrderController.readOrder);
router.get("/order", OrderController.readAllOrders);
router.put("/order/:id", OrderController.updateOrder);
router.delete("/order/:id", OrderController.deleteOrder);

/* Wishlist Controller */
router.post(
  "/wishlist",
  authMiddleware,
  WishlistController.createWishlist
);
router.get(
  "/wishlist",
  authMiddleware,
  WishlistController.readWishlist
);
router.put(
  "/wishlist",
  authMiddleware,
  WishlistController.addItem
);
router.delete(
  "/wishlist",
  authMiddleware,
  WishlistController.deleteItem
);
router.delete(
  "/wishlist/:id",
  authMiddleware,
  WishlistController.deleteWishlist
);

/* Review Controller */
router.post(
  "/review",
  authMiddleware,
  validateCreateReview,
  ReviewController.createReview
);
router.get("/review/:reviewId", ReviewController.readReview);
router.get("/review", ReviewController.readAllReviews);
router.get(
  "/review/product/:productId",
  ReviewController.readAllReviewsFromProduct
);
router.put(
  "/review",
  authMiddleware,
  validateUpdateReview,
  ReviewController.updateReview
);
router.delete(
  "/review/:reviewId",
  authMiddleware,
  ReviewController.deleteReview
);

export default router;