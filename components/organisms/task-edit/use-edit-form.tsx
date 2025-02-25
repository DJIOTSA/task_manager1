"use client"

import { editTask } from "@/lib/handlers/tasks";
import { editTaskPayload, editTaskSchema } from "@/lib/types/tasks";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner"

interface Props {
    onSuccess?: () => void
}


export default function useEditFor({ onSuccess }: Props) {

    const form = useForm<editTaskPayload>({
        resolver: zodResolver(editTaskSchema),
        defaultValues: {
            title: "12345",
        }
    });

    const mutation = useMutation({
        mutationFn: editTask,
        onSuccess: () => {

            toast("Success", {
                description: "task updated"
            })
            onSuccess?.();

        }
    });


    const onSubmit = async (values: editTaskPayload) => {
        try {
            await mutation.mutateAsync(values)
        } catch (err) {
            // const error = err as unknown as {
            //     type: string,
            //     message: string,
            //     error: string,
            // }

            // if (error.message?.includes("NetworkError")) {
            //     toast("Networ Error", {
            //         description: "Unable to connect to the server."
            //     })
            // }

            // if (error.error === "Invalid credentials") {
            //     toast("Error", {
            //         description: "Invalid email or password"
            //     })
            // }

            console.log("err", err)
        }
    }

    return {
        form,
        mutation,
        onSubmit
    }
}
