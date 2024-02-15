/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { type TaskIdParam, TaskIdParamSchema, TaskIdParamsToCustomParams } from "@/models/tasks.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const getSingleTaskRouter = express.Router();

getSingleTaskRouter.get("/:id", validate(TaskIdParamSchema), async (req: Request, res: Response) => {
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

async function getTask(id: number): Promise<TaskIdParam[]> {
    try {
        const task = await knexInstance.table("task").select("*").where({ id });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return task;
    } catch (err) {
        handleError(err, "An error occurred while fetching a task");
    }
}

export default getSingleTaskRouter;
