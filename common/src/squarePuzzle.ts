import {
  makeMove as baseMakeMove,
  verifySolution as baseVerifySolution,
} from "./logic";
import {
  Cell as BaseCell,
  Puzzle as BasePuzzle,
  Bot as BaseBot,
  Goal as BaseGoal,
  Path as BasePath,
} from "./types/interfaces";
import { randInt } from "./utils";

export class Puzzle implements BasePuzzle<Direction> {
  cells: Record<string, Cell> = {};
  bots: Record<string, Bot> = {};
  goals: Goal[] = [];
}

export class Cell implements BaseCell<Direction> {
  id: string = "0,0";
  neighbors: Record<Direction, string | null> = _null_neighbors();
}

export class Bot implements BaseBot {
  cell_id: string = "0,0";
  id: string = "0";
}
export class Goal implements BaseGoal {
  cell_id: string = "0,0";
  bot_id: string = "0";
}

export type Path = BasePath<Direction>;

export type Direction = "north" | "south" | "east" | "west";

export const makeMove = baseMakeMove<Direction>;
export const verifySolution = baseVerifySolution<Direction>;

export const generateRandomPuzzle = (
  xSize: number = 16,
  ySize: number = 16,
  nBots: number = 4,
  nGoals: number = 1
): Puzzle => {
  // Generate full connected cells
  let cells: Record<string, Cell> = {};
  for (const x of [...Array(xSize).keys()]) {
    for (const y of [...Array(ySize).keys()]) {
      cells[_coord_to_id(x, y)] = {
        id: _coord_to_id(x, y),
        neighbors: _default_neighbors(x, y, xSize, ySize),
      };
    }
  }

  // Generate Bots
  const bots: Record<string, Bot> = Object.fromEntries(
    [...Array(nBots).keys()].map((id) => [
      { id: { id: id, cell_id: _random_cell_id(xSize, ySize) } },
    ])
  );

  // Generate Goals
  const goals: Goal[] = [...Array(nGoals).keys()].map(() => ({
    bot_id: String(randInt(nBots)),
    cell_id: _random_cell_id(xSize, ySize),
  }));
  return { cells: cells, bots: bots, goals: goals };
};

// Helper function to conver x,y coords -> cell_id strings
const _coord_to_id = (x: number, y: number) => {
  return `${x},${y}`;
};

// Given a puzzle shape, generates a random cell_id
const _random_cell_id = (xSize: number, ySize: number) =>
  _coord_to_id(randInt(xSize), randInt(ySize));

//
const _null_neighbors = (): Record<Direction, string | null> => {
  return {
    north: null,
    south: null,
    east: null,
    west: null,
  };
};
const _default_neighbors = (
  x: number,
  y: number,
  xSize: number,
  ySize: number
) => {
  let neighbors: Record<Direction, string | null> = _null_neighbors();
  if (x > 0) {
    neighbors["west"] = _coord_to_id(x - 1, y);
  }
  if (x < xSize - 1) {
    neighbors["east"] = _coord_to_id(x + 1, y);
  }
  if (y > 0) {
    neighbors["south"] = _coord_to_id(x, y - 1);
  }
  if (y < ySize - 1) {
    neighbors["north"] = _coord_to_id(x, y + 1);
  }
  return neighbors;
};
