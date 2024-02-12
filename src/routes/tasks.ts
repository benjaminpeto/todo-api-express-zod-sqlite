/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { addTask, deleteTask, getTask, getTasks, updateTask } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { TaskIdParamSchema, TaskSchema, TaskIdParamsToCustomParams } from "@/models/tasks.model";
import express, { type Request, type Response } from "express";

const router = express.Router();

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        console.log(tasks);
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single task
router.get("/:id", validate(TaskIdParamSchema), async (req: Request, res: Response) => {
    try {
        const { id } = TaskIdParamsToCustomParams.parse(req);
        const task = await getTask(id);
        if (!task || task.length === 0) {
            res.status(404).json({ message: "Task not found" });
        } else {
            res.json(task[0]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new task
router.post("/", validate(TaskSchema), async (req: Request, res: Response) => {
    try {
        await addTask(req.body);
        res.status(200).json(`Task added`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update existing task
router.put("/:id", validate(TaskIdParamSchema), validate(TaskSchema), async (req: Request, res: Response) => {
    try {
        const { id } = TaskIdParamsToCustomParams.parse(req);
        await updateTask(id, req.body);
        res.status(200).json(`Task updated`);
    } catch (err) {
        if (err instanceof Error && err.message) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred while deleting a task" });
        }
    }
});

// Delete task
router.delete("/:id", validate(TaskIdParamSchema), async (req: Request, res: Response) => {
    const { id } = TaskIdParamsToCustomParams.parse(req);
    try {
        await deleteTask(id);
        res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        if (err instanceof Error && err.message) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred while deleting a task" });
        }
    }
});

export default router;
