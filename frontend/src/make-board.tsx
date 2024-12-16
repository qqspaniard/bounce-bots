enum Orientation {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export enum RobotColor {
  YELLOW = 'yellow',
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green'
}

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRange = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
};

const getRandomInSet = (set: number[], num: number) => {
  const returnSet = [];
  while (returnSet.length < num) {
    const randomI = getRandomNumber(0, set.length - 1);
    returnSet.push(set[randomI]);
  }
  return returnSet;
};

const wallSpinesHorizontal = [
  getRandomNumber(0, 6),
  getRandomNumber(7, 14),
  getRandomNumber(0, 6) + 15 * 16,
  getRandomNumber(7, 14) + 15 * 16
];

const wallSpinesVertical = [
  getRandomNumber(0, 8) * 16,
  getRandomNumber(0, 8) * 16 + 15, // max is 15 here
  getRandomNumber(0, 8) * 16 + 7 * 16,
  getRandomNumber(0, 8) * 16 + 7 * 16 + 15
];

const Q1 = [
  ...getRange(17, 23),
  ...getRange(33, 39),
  ...getRange(49, 55),
  ...getRange(65, 71),
  ...getRange(81, 87),
  ...getRange(97, 101),
  ...getRange(113, 117)
];
const Q2 = [
  ...getRange(24, 30),
  ...getRange(40, 46),
  ...getRange(56, 62),
  ...getRange(72, 78),
  ...getRange(88, 94),
  ...getRange(106, 110),
  ...getRange(122, 126)
];
const Q3 = [
  ...getRange(129, 133),
  ...getRange(145, 149),
  ...getRange(161, 167),
  ...getRange(177, 183),
  ...getRange(193, 199),
  ...getRange(209, 215),
  ...getRange(225, 231)
];
const Q4 = [
  ...getRange(138, 142),
  ...getRange(154, 158),
  ...getRange(168, 174),
  ...getRange(184, 190),
  ...getRange(200, 206),
  ...getRange(216, 222),
  ...getRange(232, 238)
];
const cornerCoords = [
  ...getRandomInSet(Q1, 4),
  ...getRandomInSet(Q2, 4),
  ...getRandomInSet(Q3, 4),
  ...getRandomInSet(Q4, 4)
].map((coord) => ({
  coord,
  orientation: [
    Orientation.UP,
    Orientation.RIGHT,
    Orientation.DOWN,
    Orientation.LEFT
  ][Math.floor(Math.random() * 4)]
}));

const cornerCoordsHorizontal = cornerCoords.map(({ coord, orientation }) =>
  orientation === Orientation.UP || orientation === Orientation.RIGHT
    ? coord - 1
    : coord
);

const cornerCoordsVertical = cornerCoords.map(({ coord, orientation }) =>
  orientation === Orientation.DOWN || orientation === Orientation.RIGHT
    ? coord - 16
    : coord
);

export const wallsHorizontal = Array(16 * 16)
  .fill(false)
  .map((_, id) => {
    if (wallSpinesHorizontal.includes(id)) return true;
    if (cornerCoordsHorizontal.includes(id)) return true;
    return false;
  });

export const wallsVertical = Array(16 * 16)
  .fill(false)
  .map((_, id) => {
    if (wallSpinesVertical.includes(id)) return true;
    if (cornerCoordsVertical.includes(id)) return true;
    return false;
  });

export const cellGrid: {
  id: number;
  goal: null | RobotColor;
  coord: {
    x: number;
    y: number;
  };
}[] = Array(16 * 16)
  .fill(null)
  .map((_, id) => ({
    id,
    coord: { x: id % 16, y: id - (id % 16) },
    goal: null
  }));
// splice the center island cells from list
cellGrid.splice(135, 2);
cellGrid.splice(119, 2);
cellGrid[100].goal = RobotColor.RED;
