import User from "../models/user.model";
import { getNextLevelExp } from "../utils/leveling.ts";

export const findByEmail = (email: string) => User.findOne({ email });

export const findById = (id: string) => User.findById(id).select("-password");

export const create = (data: {
  username: string;
  email: string;
  password: string;
}) => User.create(data);

export const incrementRewards = async (
  userId: string,
  reward: { exp?: number; coins?: number },
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const prevLevel = user.level ?? 1;

  user.exp = user.exp ?? 0;
  user.coins = user.coins ?? 0;
  user.level = user.level ?? 1;

  if (reward.exp) user.exp += reward.exp;
  if (reward.coins) user.coins += reward.coins;

  while (user.exp >= getNextLevelExp(user.level)) {
    user.exp -= getNextLevelExp(user.level);
    user.level += 1;
  }

  while (user.exp < 0 && user.level > 1) {
    user.level -= 1;
    user.exp += getNextLevelExp(user.level);
  }

  if (user.level === 1 && user.exp < 0) {
    user.exp = 0;
  }

  await user.save();
  return {
    user,
    levelChange: user.level - prevLevel,
  };
};
