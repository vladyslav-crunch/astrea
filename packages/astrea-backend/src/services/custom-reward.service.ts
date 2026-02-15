import * as CustomRewardDAO from "../daos/custom-reward.dao";

export const getUserCustomRewards = async (userId: string) => {
  return CustomRewardDAO.getUserCustomRewards(userId);
};

export const createCustomReward = async (
  userId: string,
  title: string,
  coins: number,
  description?: string,
) => {
  return CustomRewardDAO.createCustomReward(userId, title, coins, description);
};

export const updateCustomReward = async (
  userId: string,
  rewardId: string,
  title: string,
  coins: number,
  description?: string,
) => {
  return CustomRewardDAO.updateCustomReward(
    userId,
    rewardId,
    title,
    coins,
    description,
  );
};

export const claimCustomReward = async (userId: string, rewardId: string) => {
  return CustomRewardDAO.claimCustomReward(userId, rewardId);
};

export const deleteCustomReward = async (userId: string, rewardId: string) => {
  return CustomRewardDAO.deleteCustomReward(userId, rewardId);
};
