export function calculateTaskReward(
  difficulty: "easy" | "medium" | "hard" | "epic",
  modifier: number,
) {
  const base = {
    easy: { exp: 10, coins: 5 },
    medium: { exp: 20, coins: 10 },
    hard: { exp: 40, coins: 20 },
    epic: { exp: 80, coins: 40 },
  };

  return {
    exp: base[difficulty].exp * modifier,
    coins: base[difficulty].coins * modifier,
  };
}
