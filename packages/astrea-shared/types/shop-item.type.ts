export type ShopItemType = "border" | "title" | "avatar";

export type ShopItem = {
  _id?: string;
  name: string;
  description: string;
  type: ShopItemType;
  price: number;
  imageUrl?: string;
  color?: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  requiredLevel?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
