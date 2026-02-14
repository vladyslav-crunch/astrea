import { Router } from "express";
import {
  getShopItems,
  purchaseItem,
  equipItem,
  getUserInventory,
} from "../controllers/shop.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();

router.get("/items", isAuthenticated, getShopItems);
router.get("/inventory", isAuthenticated, getUserInventory);
router.post("/purchase", isAuthenticated, purchaseItem);
router.post("/equip", isAuthenticated, equipItem);

export default router;
