import { generateRandomPuzzle } from "../../../common/squarePuzzle";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "The server is up and running" });
});

router.get("/puzzles/daily", (req: Request, res: Response) => {
  const puzzle = generateRandomPuzzle();
  res.json(puzzle);
});

export default router;
