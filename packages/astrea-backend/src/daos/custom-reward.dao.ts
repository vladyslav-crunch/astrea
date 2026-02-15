import CustomReward from "../models/custom-reward.model";
import User from "../models/user.model";

export const getUserCustomRewards = async (userId: string) => {
  return CustomReward.find({ userId }).sort({ createdAt: -1 });
};

export const createCustomReward = async (
  userId: string,
  title: string,
  coins: number,
  description?: string,
) => {
  return await CustomReward.create({
    userId,
    title,
    description,
    coins,
  });
};

export const updateCustomReward = async (
  userId: string,
  rewardId: string,
  title: string,
  coins: number,
  description?: string,
) => {
  const reward = await CustomReward.findOne({ _id: rewardId, userId });
  if (!reward) throw new Error("Reward not found");

  reward.title = title;
  reward.description = description;
  reward.coins = coins;
  await reward.save();
  return reward;
};

export const claimCustomReward = async (userId: string, rewardId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const reward = await CustomReward.findOne({ _id: rewardId, userId });
  if (!reward) throw new Error("Reward not found");

  // Check if user has enough coins
  const userCoins = user.coins ?? 0;
  if (userCoins < reward.coins) {
    throw new Error("Not enough coins");
  }

  user.coins = userCoins - reward.coins;
  await user.save();

  return { user, reward };
};

export const deleteCustomReward = async (userId: string, rewardId: string) => {
  const result = await CustomReward.deleteOne({ _id: rewardId, userId });
  if (result.deletedCount === 0) {
    throw new Error("Reward not found");
  }
  return { success: true };
};
