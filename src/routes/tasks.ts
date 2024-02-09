/* eslint-disable @typescript-eslint/no-misused-promises */
import { getTasks } from "@/db/database";
import express, { type Request, type Response } from "express";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        console.log(tasks);
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
