export const playSound = (url: string): void => {
  const audio = new Audio(url);
  audio.volume = 0.2;
  audio.play().catch((err) => console.error("Failed to play sound:", err));
};
