/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { addTask, deleteTask, getTask, getTasks, updateTask } from "@/db/database";
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

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const task = await getTask(Number(req.params.id));
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/create", async (req: Request, res: Response) => {
    try {
        await addTask(req.body);
        res.status(200).json("Task added");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/update/:id", async (req: Request, res: Response) => {
    try {
        await updateTask(Number(req.params.id), req.body);
        res.status(200).json("Task updated");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        await deleteTask(Number(req.params.id));
        res.status(200).json("Task deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
