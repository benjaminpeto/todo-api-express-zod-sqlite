/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { type UpdateUser, UserIdParamSchema, UserIdParamsToCustomParams, updateUserSchema } from "@/models/users.model";
import { handleError } from "@/utils/handleError";
import { getHashedPassword } from "@/utils/hashPassword";
import express, { type Request, type Response } from "express";

const updateUserRouter = express.Router();

updateUserRouter.put("/:id", validate(UserIdParamSchema), validate(updateUserSchema), async (req: Request, res: Response) => {
    try {
        const { id } = UserIdParamsToCustomParams.parse(req);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await updateUser(id, req.body);
        res.status(200).json(`User updated`);
    } catch (err) {
        if (err instanceof Error && err.message) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An error occurred while updating the user" });
        }
    }
});

async function updateUser(id: number, user: UpdateUser["body"]): Promise<void> {
    let updatedUser = user;
    if (user.password !== undefined) {
        const hashedPassword = await getHashedPassword(user.password);

        updatedUser = {
            ...user,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        };
    }

    try {
        const hasUpdatedUser = Boolean(await knexInstance.table("users").update(updatedUser).where({ id }));
        if (!hasUpdatedUser) {
            throw new Error(`User with ID ${id} does not exist`);
        }
    } catch (err) {
        handleError(err, "An error occurred while updating the user");
    }
}

export default updateUserRouter;
