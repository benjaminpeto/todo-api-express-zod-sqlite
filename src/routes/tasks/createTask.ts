/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { type Task, TaskSchema } from "@/models/tasks.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const createTaskRouter = express.Router();

createTaskRouter.post("/", validate(TaskSchema), async (req: Request, res: Response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await addTask(req.body);
        res.status(200).json(`Task added successfully`);
    } catch (err) {
        res.status(500).json(err);
    }
});

async function addTask(task: Task["body"]): Promise<void> {
    try {
        await knexInstance.table("task").insert(task).returning("id");
    } catch (err) {
        handleError(err, "An error occurred while adding a task");
    }
}

export default createTaskRouter;
