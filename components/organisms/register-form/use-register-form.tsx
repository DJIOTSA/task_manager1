"use client";

import { register } from "@/lib/handlers/auth";
import { registerPayload, registerSchema } from "@/lib/types/auth";
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
      password2: "",
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
        status: number,
        type: string;
        message: string;
        error: string;
        errors: object;
      };

      console.log(error)

      if (error.status === 422) {
        Object.entries(error.errors).map(([k, value]) => {
          form.setError(k as keyof registerPayload, {
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
