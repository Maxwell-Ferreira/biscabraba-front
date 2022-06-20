export const playAudio = (src) => {
  const audio = new Audio(src);
  audio.play();
  return audio;
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}