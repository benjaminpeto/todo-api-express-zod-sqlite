import * as z from "zod";

export const Task = z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    completed: z.boolean(),
});

export type Task = z.infer<typeof Task>;
