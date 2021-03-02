import random from "lodash/random";

const RandomColor = [
  "rgba(110,109,170,1)",
  "rgba(170,109,109,1)",
  "rgba(170,140,109,1)",
  "rgba(99,144,197,1)",
];

export const getRandomColor = () => {
  return RandomColor[random(3)];
};
