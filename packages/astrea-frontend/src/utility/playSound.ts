export const playSound = (url: string, volume: number = 0.2): void => {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play().catch((err) => console.error("Failed to play sound:", err));
};
