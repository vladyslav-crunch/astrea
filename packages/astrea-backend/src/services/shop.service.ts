import * as ShopDAO from "../daos/shop.dao";
import type { ShopItem } from "astrea-shared/types/shop-item.type.ts";

export const getShopItems = async () => {
  return ShopDAO.getAllShopItems();
};

export const purchaseItem = async (userId: string, itemId: string) => {
  return ShopDAO.purchaseItem(userId, itemId);
};

export const equipItem = async (
  userId: string,
  itemId: string,
  type: "border" | "title",
) => {
  return ShopDAO.equipItem(userId, itemId, type);
};

export const getUserInventory = async (userId: string) => {
  return ShopDAO.getUserInventory(userId);
};

export const createShopItem = async (itemData: ShopItem) => {
  return ShopDAO.createShopItem(itemData);
};
