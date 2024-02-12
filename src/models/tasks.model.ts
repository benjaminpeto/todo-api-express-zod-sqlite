import * as z from "zod";

export const TaskSchema = z.object({
    body: z.object({
        id: z.number().min(1),
        name: z.string().min(1),
        completed: z.boolean(),
    }),
});

export const TaskIdParamSchema = z.object({
    params: z.object({
        id: z.string().min(1),
    }),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskIdParam = z.infer<typeof TaskIdParamSchema>;
