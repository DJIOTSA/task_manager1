import z from "zod";


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});


export type LoginPayload = z.infer<typeof loginSchema>;


export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    password2: z.string().min(4),
    role: z.string()
}).refine((data) => data.password === data.password2, {
    message: "Passwords must match",
    path: ["password2"], 
  });

export type registerPayload = z.infer<typeof registerSchema>