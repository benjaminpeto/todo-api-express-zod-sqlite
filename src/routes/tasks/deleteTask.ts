/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { TaskIdParamSchema, TaskIdParamsToCustomParams } from "@/models/tasks.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const deleteTaskRouter = express.Router();

deleteTaskRouter.delete("/:id", validate(TaskIdParamSchema), async (req: Request, res: Response) => {
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

async function deleteTask(id: number): Promise<void> {
    try {
        const hasDeletedTask = Boolean(await knexInstance.table("task").del().where({ id }));
        if (!hasDeletedTask) {
            throw new Error(`Task with ID ${id} does not exist`);
        }
    } catch (err) {
        handleError(err, "An error occurred while deleting a task");
    }
}

export default deleteTaskRouter;
