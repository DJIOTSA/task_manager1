"use client";

import { register } from "@/lib/handlers/register";
import { registerPayload, registerSchema } from "@/lib/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
}

export default function useRegisterForm({ onSuccess }: Props) {
  const form = useForm<registerPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast("Success", {
        description: "Successfully registered",
      });
      onSuccess?.();
    },
  });

  const onSubmit = async (values: registerPayload) => {
    try {
      await mutation.mutateAsync(values);
    } catch (err) {
      const error = err as unknown as {
        type: string;
        message: string;
        error: string;
      };

      if (error.message?.includes("NetworkError")) {
        toast("Networ Error", {
          description: "Unable to connect to the server.",
        });
      }

      if (error.error === "Invalid credentials") {
        toast("Error", {
          description: "Invalid email or password",
        });
      }
    }
  };

  return {
    form,
    mutation,
    onSubmit,
  };
}
