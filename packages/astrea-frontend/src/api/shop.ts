import { request } from "./request";
import type { ShopItem } from "astrea-shared";

const API_URL = "http://localhost:3000/api/shop";

export const getShopItems = async (): Promise<{ items: ShopItem[] }> => {
  return request(`${API_URL}/items`, { method: "GET" }, true);
};

export const getUserInventory = async (): Promise<{
  inventory: ShopItem[];
}> => {
  return request(`${API_URL}/inventory`, { method: "GET" }, true);
};

export const purchaseItem = async (
  itemId: string,
): Promise<{ message: string; user: any }> => {
  return request(
    `${API_URL}/purchase`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    },
    true,
  );
};

export const equipItem = async (
  itemId: string,
  type: "border" | "title",
): Promise<{ message: string; user: any }> => {
  return request(
    `${API_URL}/equip`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, type }),
    },
    true,
  );
};
