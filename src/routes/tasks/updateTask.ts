/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { TaskIdParamSchema, TaskSchema, TaskIdParamsToCustomParams, type Task } from "@/models/tasks.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const updateTaskRouter = express.Router();

updateTaskRouter.put("/:id", validate(TaskIdParamSchema), validate(TaskSchema), async (req: Request, res: Response) => {
    try {
        const { id } = TaskIdParamsToCustomParams.parse(req);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await updateTask(id, req.body);
        res.status(200).json(`Task updated`);
    } catch (err) {
        if (err instanceof Error && err.message) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred while updating the task" });
        }
    }
});

async function updateTask(id: number, task: Task): Promise<void> {
    console.log("ID:", id);
    try {
        const hasUpdatedTask = Boolean(await knexInstance.table("task").update(task).where({ id }));
        console.log("hasUpdatedTask:", hasUpdatedTask);
        if (!hasUpdatedTask) {
            throw new Error(`Task with ID ${id} does not exist`);
        }
    } catch (err) {
        handleError(err, "An error occurred while updating a task");
    }
}

export default updateTaskRouter;
