import { type RegisterUser } from "@/models/users.model";
import { type NextFunction, type Request, type Response } from "express";
import { type ZodType, type AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject | ZodType<RegisterUser>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};
