import { Router, Request, Response } from "express";
import { CLUB_OVERALL_STATS } from "utils/sample_data/club-overall-stats";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(CLUB_OVERALL_STATS);
});

router.get("/:id", (req: Request, res: Response) => {
  const club = CLUB_OVERALL_STATS.find((m) => m.clubId === req.params.id);
  if (!club) {
    res.status(404).json({ error: "Club not found" });
    return;
  }
  res.json(club);
});

export default router;
