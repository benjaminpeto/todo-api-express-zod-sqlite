/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Task } from "@/models/tasks.model";
import express, { type Request, type Response } from "express";
import { knexInstance } from "@/db/database";
import { handleError } from "@/utils/handleError";

const getAllTasksRouter = express.Router();

getAllTasksRouter.get("/", async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10; // default limit to 10
        const offset = Number(req.query.offset) || 0; // default offset to 0
        const tasks = await getTasks(limit, offset);
        if (tasks?.length === 0) {
            res.status(404).json({ message: "No more tasks to show" });
        } else {
            res.json(tasks);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

async function getTasks(limit: number, offset: number): Promise<Task[]> {
    try {
        const tasks: Task[] = await knexInstance.table("task").select("*").limit(limit).offset(offset);
        return tasks;
    } catch (err) {
        handleError(err, "An error occurred while fetching all tasks");
    }
}

export default getAllTasksRouter;
