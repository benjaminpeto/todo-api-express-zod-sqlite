/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { type User } from "@/models/users.model";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";

const getAllUsersRouter = express.Router();

getAllUsersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await getUsers();

        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

async function getUsers(): Promise<User[]> {
    try {
        const users: User[] = await knexInstance.table("users").select("*");
        return users;
    } catch (err) {
        handleError(err, "An error occurred while fetching all users");
    }
}

export default getAllUsersRouter;
