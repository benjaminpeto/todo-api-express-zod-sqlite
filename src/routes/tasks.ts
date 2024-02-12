/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { addTask, deleteTask, getTask, getTasks, updateTask } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { TaskIdParamSchema, TaskSchema } from "@/models/tasks.model";
import express, { type Request, type Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        console.log(tasks);
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", validate(TaskIdParamSchema), async (req: Request, res: Response) => {
    try {
        const task = await getTask(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/create", validate(TaskSchema), async (req: Request, res: Response) => {
    try {
        await addTask(req.body);
        res.status(200).json(`Task added: ${req.body}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/update/:id", validate(TaskIdParamSchema), validate(TaskSchema), async (req: Request, res: Response) => {
    try {
        await updateTask(Number(req.params.id), req.body);
        res.status(200).json(`Task updated: ${req.body}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/delete/:id", validate(TaskIdParamSchema), async (req: Request, res: Response) => {
    try {
        await deleteTask(req.params.id);
        res.status(200).json(`Task deleted with the ID of ${req.params.id}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
