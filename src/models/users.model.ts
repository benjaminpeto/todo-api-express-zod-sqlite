import { z } from "zod";

export const UserSchema = z.object({
    body: z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6),
    }),
});

export type User = z.infer<typeof UserSchema>;

export const registerUserSchema = z.object({
    body: z
        .object({
            name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
            email: z.string().email({ message: "Invalid email address" }),
            password: z.string().min(6, { message: "Password must contain minimum 6 characters!" }),
            confirmPassword: z.string().min(6, { message: "Password must contain minimum 6 characters!" }),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "The passwords did not match",
                    path: ["confirmPassword"],
                });
            }
        }),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;

export const UserIdParamSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const UserIdParamsToCustomParams = UserIdParamSchema.transform(({ params }) => ({
    id: Number(params.id),
}));

export type UserIdParam = z.infer<typeof UserIdParamSchema>;
