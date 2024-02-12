import * as z from "zod";

export const TaskSchema = z.object({
    body: z.object({
        name: z.string().min(1),
    }),
});

export const TaskIdParamSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const TaskIdParamsToCustomParams = TaskIdParamSchema.transform(({ params }) => ({
    id: Number(params.id),
}));

export type Task = z.infer<typeof TaskSchema>;
export type TaskIdParam = z.infer<typeof TaskIdParamSchema>;
