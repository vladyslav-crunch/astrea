import type { Response } from "express";
import type { AuthRequest } from "../middleware/isAuthenticated";
import * as ShopService from "../services/shop.service";
import { purchaseItemSchema, equipItemSchema } from "astrea-shared";

export const getShopItems = async (_req: AuthRequest, res: Response) => {
  try {
    const items = await ShopService.getShopItems();
    res.status(200).json({ items });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const purchaseItem = async (req: AuthRequest, res: Response) => {
  const parsed = purchaseItemSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const user = await ShopService.purchaseItem(
      req.user!.id,
      parsed.data.itemId,
    );
    res.status(200).json({
      message: "Item purchased successfully",
      user,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const equipItem = async (req: AuthRequest, res: Response) => {
  const parsed = equipItemSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const userId = req.user!.id;
    const user = await ShopService.equipItem(
      userId,
      parsed.data.itemId,
      parsed.data.type,
    );
    res.status(200).json({
      message: "Item equipped successfully",
      user,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserInventory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const inventory = await ShopService.getUserInventory(userId);
    res.status(200).json({ inventory });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
