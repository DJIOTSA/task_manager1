import z from "zod"

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.string()
})

export type registerPayload = z.infer<typeof registerSchema>