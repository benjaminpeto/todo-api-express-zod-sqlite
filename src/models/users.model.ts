import { z } from "zod";

export const UserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6),
});

export type User = z.infer<typeof UserSchema>;
