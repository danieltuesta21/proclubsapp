import { Router, Request, Response } from "express";
import { CLUB_MEMBERS } from "utils/sample_data/club-members";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(CLUB_MEMBERS.members);
});

router.get("/:id", (req: Request, res: Response) => {
  const club_member = CLUB_MEMBERS.members.find((m) => m.name === req.params.id);
  if (!club_member) {
    res.status(404).json({ error: "Club member not found" });
    return;
  }
  res.json(club_member);
});

export default router;
