"use client";

import { createTask, updateTask } from "@/lib/handlers/tasks";
import { editTaskPayload, editTaskSchema } from "@/lib/types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
  payload?: Partial<editTaskPayload>;
  taskId?: string;
}

export default function useEditTask(
  { onSuccess, 
    payload, 
    taskId 
  }: Props) {
  const form = useForm<editTaskPayload>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      ...payload
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: editTaskPayload) => 
      taskId 
    ? await updateTask(taskId, payload) 
    : await createTask(payload),
    onSuccess: async () => {
        await queryClient.invalidateQueries(['tasks']);
        form.reset();
        onSuccess?.();
        const successMessage = taskId 
        ? "Successfully Updated" 
        : "Successfully created"
        toast("Success", {
            description: successMessage,
        });
    },
  });

  const onSubmit = async (values: editTaskPayload) => {
    try {
      await mutation.mutateAsync(values);
    } catch (err) {
      const error = err as unknown as {
        status: number,
        type: string;
        message: string;
        error: string;
        errors: object;
      };

      if (error.status === 422) {
        Object.entries(error.errors).map(([k, value]) => {
          form.setError(k as keyof editTaskPayload, {
            message: value
          })
        });
      } else {
        if (error.message?.includes("NetworkError")) {
          toast("Networ Error", {
            description: "Unable to connect to the server.",
          });
        } else if (error.error === "Invalid credentials") {
          toast("Error", {
            description: "Invalid email or password",
          });
        } else {
          toast("Error", {
            description: error.error,
          });
        }
      }
    }
  };

  return {
    form,
    mutation,
    onSubmit,
  };
}
