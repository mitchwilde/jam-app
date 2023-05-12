import express from "express";
import * as MemosController from "../controllers/memos";

const router = express.Router();

router.get("/", MemosController.getMemos);

router.get("/:memoId", MemosController.getMemo);

router.post("/", MemosController.createMemo);

router.patch("/:memoId", MemosController.updateMemo);

router.delete("/:memoId", MemosController.deleteMemo);

export default router;