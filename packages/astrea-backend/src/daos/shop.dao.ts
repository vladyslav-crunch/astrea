import ShopItem from "../models/shop-item.model";
import User from "../models/user.model";
import type { ShopItem as ShopItemType } from "astrea-shared/types/shop-item.type.ts";

export const getAllShopItems = () => ShopItem.find();

export const getShopItemById = (itemId: string) => ShopItem.findById(itemId);

export const createShopItem = (data: ShopItemType) => ShopItem.create(data);

export const purchaseItem = async (userId: string, itemId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const item = await ShopItem.findById(itemId);
  if (!item) throw new Error("Item not found");

  // Check if user already owns the item
  if (user.inventory?.includes(itemId)) {
    throw new Error("You already own this item");
  }

  // Check if user has enough coins
  const userCoins = user.coins ?? 0;
  if (userCoins < item.price) {
    throw new Error("Not enough coins");
  }

  // Check level requirement
  if (item.requiredLevel && user.level && user.level < item.requiredLevel) {
    throw new Error(`Requires level ${item.requiredLevel}`);
  }

  // Deduct coins and add item to inventory
  user.coins = userCoins - item.price;
  user.inventory = user.inventory ?? [];
  user.inventory.push(itemId);

  await user.save();
  return user;
};

export const equipItem = async (
  userId: string,
  itemId: string,
  type: "border" | "title",
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Check if user owns the item (empty string means unequip)
  if (itemId && !user.inventory?.includes(itemId)) {
    throw new Error("You don't own this item");
  }

  // Equip the item
  if (type === "border") {
    user.border = itemId;
  } else if (type === "title") {
    user.title = itemId;
  }

  await user.save();
  return user;
};

export const getUserInventory = async (userId: string) => {
  const user = await User.findById(userId).select("inventory");
  if (!user) throw new Error("User not found");

  return ShopItem.find({
    _id: { $in: user.inventory ?? [] },
  });
};
