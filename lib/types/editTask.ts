import z from "zod";


export const editTaskSchema = z.object({
    id: z.string(),
    title: z.string()
});


export type editTaskPayload = z.infer<typeof editTaskSchema>;