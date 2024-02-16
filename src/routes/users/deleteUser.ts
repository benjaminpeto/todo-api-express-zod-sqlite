/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { UserIdParamSchema, UserIdParamsToCustomParams } from "@/models/users.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const deleteUserRouter = express.Router();

deleteUserRouter.delete("/:id", validate(UserIdParamSchema), async (req: Request, res: Response) => {
    const { id } = UserIdParamsToCustomParams.parse(req);
    try {
        await deleteUser(id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        if (err instanceof Error && err.message) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred while deleting a user" });
        }
    }
});

async function deleteUser(id: number): Promise<void> {
    try {
        const hasDeletedUser = Boolean(await knexInstance.table("users").del().where({ id }));
        if (!hasDeletedUser) {
            throw new Error(`User with ID ${id} does not exist`);
        }
    } catch (err) {
        handleError(err, "An error occurred while deleting a user");
    }
}

export default deleteUserRouter;
