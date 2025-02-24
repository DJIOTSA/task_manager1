import z from "zod";


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});


export type LoginPayload = z.infer<typeof loginSchema>;