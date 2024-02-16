/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { validate } from "@/middlewares/zod.middleware";
import { UserIdParamSchema, UserIdParamsToCustomParams, type UserIdParam } from "@/models/users.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const getSingleUserRouter = express.Router();

getSingleUserRouter.get("/:id", validate(UserIdParamSchema), async (req: Request, res: Response) => {
    try {
        const { id } = UserIdParamsToCustomParams.parse(req);
        const user = await getUser(id);
        if (!user || user.length === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(user[0]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

async function getUser(id: number): Promise<UserIdParam[]> {
    try {
        const user = await knexInstance.table("users").select("*").where({ id });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return user;
    } catch (err) {
        handleError(err, "An error occurred while fetching the user");
    }
}

export default getSingleUserRouter;
