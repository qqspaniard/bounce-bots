export interface Puzzle<D extends Direction> {
  cells: Record<string, Cell<D>>;
  bots: Record<string, Bot>;
  goals: Goal[]; // We might want to have multiple goals in a puzzle
}

export interface Cell<D extends Direction> {
  id: string; // Used to compute location for rendering purposes
  neighbors: Record<D, string | null>; // Map Direction to cell_id
}

export interface Bot {
  cell_id: string;
  id: string;
}

export interface Goal {
  cell_id: string;
  bot_id: string;
}

export type Path<D extends Direction> = { bot_id: string; direction: D }[];

export type Direction = string;
