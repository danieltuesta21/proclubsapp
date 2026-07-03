import { Router, Request, Response } from "express";
import { getClubOverallStats } from "../eaApi";

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const clubId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const stats = await getClubOverallStats(clubId);
    if (!Array.isArray(stats) || stats.length === 0) {
      res.status(404).json({ error: "Club not found" });
      return;
    }

    res.json(stats[0]);
  } catch (error) {

    console.error("Failed to fetch club overall stats", error);
    res.status(500).json({ error: "Failed to fetch club data" });
  }
});

export default router;
