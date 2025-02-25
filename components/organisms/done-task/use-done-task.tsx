"use client";

import { isDoneTask } from "@/lib/handlers/tasks";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

export interface Props {
    onSuccess?: () => void;
    taskId: string;
}

export function useDoneTask(
    {
        onSuccess,
        taskId,

    }: Props) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => await isDoneTask(taskId),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['tasks']);
            onSuccess?.();
            const successMessage = "Task Done"
            toast("Success", {
                description: successMessage,
            });
        },
    });

    const onSubmit = async () => {
        try {
            await mutation.mutateAsync();
        } catch (err) {

            const error = err as unknown as {
                status: number,
                type: string;
                message: string;
                error: string;
                errors: object;
            };

            if (error.message?.includes("NetworkError")) {
                toast("Networ Error", {
                    description: "Unable to connect to the server.",
                });
            } else if (error.error === "Task not found") {
                toast("Error", {
                    description: "Task not found",
                });
            }

        }
    };

    return {
        mutation,
        onSubmit,
    };
}
