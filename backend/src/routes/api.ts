import { generateRandomPuzzle } from "@bounce-bots/common";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.json({ message: "The server is up and running" });
});

router.get("/puzzles/daily", (_: Request, res: Response) => {
  const puzzle = generateRandomPuzzle();
  res.json(puzzle);
});

export default router;
