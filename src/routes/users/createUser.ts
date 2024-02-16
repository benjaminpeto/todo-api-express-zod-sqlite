/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { knexInstance } from "@/db/database";
import { handleError } from "@/utils/handleError";
import express, { type Request, type Response } from "express";
import { registerUserSchema, type RegisterUser } from "@/models/users.model";
import { validate } from "@/middlewares/zod.middleware";
import { getHashedPassword } from "@/utils/hashPassword";

const createUserRouter = express.Router();

createUserRouter.post("/register", validate(registerUserSchema), async (req: Request, res: Response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await createUser(req.body);
        res.status(200).json(`User added successfully`);
    } catch (err) {
        res.status(500).json(err);
    }
});

async function createUser(user: RegisterUser["body"]): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const hashedPassword = await getHashedPassword(user.password);

    const newUser = {
        ...user,
        password: hashedPassword,
        confirmPassword: hashedPassword,
    };

    try {
        await knexInstance.table("users").insert(newUser).returning("id");
    } catch (err) {
        handleError(err, "An error occurred while creating new user");
    }
}

export default createUserRouter;
