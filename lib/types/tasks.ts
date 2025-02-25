import z from "zod";


export const editTaskSchema = z.object({
    title: z.string().trim()
});


export type editTaskPayload = z.infer<typeof editTaskSchema>;

export interface Task {
    id: string;
    title: string;
    date?: Date;
    isDone: boolean;
}