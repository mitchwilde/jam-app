import express from "express";
import * as MemosController from "../controllers/memos";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, MemosController.getMemos);

router.get("/:memoId", MemosController.getMemo);

router.post("/", MemosController.createMemo);

router.patch("/:memoId", MemosController.updateMemo);

router.delete("/:memoId", MemosController.deleteMemo);

export default router;