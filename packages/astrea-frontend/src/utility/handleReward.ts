import { toast } from "sonner";
import { playSound } from "./playSound";

interface Reward {
  type: "granted" | "revoked";
  exp: number;
  coins: number;
  levelChange: number;
}

export const handleReward = (reward: Reward): void => {
  const { type, exp, coins, levelChange } = reward;

  if (type === "granted") {
    playSound("/sounds/retro-game-coin-pickup.mp3");
    toast.success(`+${exp} XP, +${coins} Astra coins`);
  } else {
    playSound("/sounds/game-lose.mp3");
    toast.error(`-${exp} XP, -${coins} Astra coins`);
  }

  // Handle level changes
  if (levelChange > 0) {
    playSound("/sounds/level-up.mp3");
    toast.success(`🎉 Level up! +${levelChange}`);
  } else if (levelChange < 0) {
    playSound("/sounds/level-down.mp3", 0.05);
    toast.warning(`⬇️ Level down`);
  }
};
