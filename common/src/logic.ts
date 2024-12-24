import { Cell, Direction, Path, Puzzle } from "./types/interfaces";

/**
 * Computes the final location after a move from a Cell in a Direction
 */
export const makeMove = <D extends Direction>(
  puzzle: Puzzle<D>,
  cell: Cell<D>,
  direction: D
): Cell<D> => {
  if (!cell.neighbors[direction]) return cell;
  return makeMove<D>(
    puzzle,
    puzzle.cells[cell.neighbors[direction]],
    direction
  );
};

export const verifySolution = <D extends Direction>(
  puzzle: Puzzle<D>,
  solution: Path<D>
): boolean => {
  let bot_states = puzzle.bots;
  for (const { bot_id, direction } of solution) {
    bot_states[bot_id].cell_id = makeMove(
      puzzle,
      puzzle.cells[bot_states[bot_id].cell_id],
      direction
    ).id;
  }
  for (const goal of puzzle.goals) {
    if (goal.cell_id != bot_states[goal.bot_id].id) return false;
  }
  return true;
};
