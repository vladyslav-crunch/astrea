import { request } from "./request";
import type { CustomReward } from "astrea-shared";

const API_URL = "http://localhost:3000/api/custom-rewards";

export const getCustomRewards = async (): Promise<{
  rewards: CustomReward[];
}> => {
  return request(`${API_URL}`, { method: "GET" }, true);
};

export const createCustomReward = async (
  title: string,
  coins: number,
  description?: string,
): Promise<{ message: string; reward: CustomReward }> => {
  return request(
    `${API_URL}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, coins, description }),
    },
    true,
  );
};

export const updateCustomReward = async (
  rewardId: string,
  title: string,
  coins: number,
  description?: string,
): Promise<{ message: string; reward: CustomReward }> => {
  return request(
    `${API_URL}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rewardId, title, coins, description }),
    },
    true,
  );
};

export const claimCustomReward = async (
  rewardId: string,
): Promise<{ message: string; user: Record<string, unknown> }> => {
  return request(
    `${API_URL}/claim`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rewardId }),
    },
    true,
  );
};

export const deleteCustomReward = async (
  rewardId: string,
): Promise<{ message: string }> => {
  return request(`${API_URL}/${rewardId}`, { method: "DELETE" }, true);
};
