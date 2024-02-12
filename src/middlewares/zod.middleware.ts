import { type NextFunction, type Request, type Response } from "express";
import { type AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
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
