export const randInt = (max: number, min: number = 0): number => {
  return Math.floor(
    Math.random() * (Math.ceil(min) + Math.floor(max)) + Math.ceil(min)
  );
};
