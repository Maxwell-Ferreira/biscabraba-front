export const playAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.play();
  return audio;
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
