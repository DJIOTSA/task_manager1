"use client"

import { login } from "@/lib/handlers/auth";
import { LoginPayload, loginSchema } from "@/lib/types/auth"
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner"

interface Props {
  onSuccess?: () => void
}


export default function useLoginForm({onSuccess}: Props) {

    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "mhulodjiotsa@gmail.com",
          password: "12345",
        }
      });

  const mutation = useMutation({
      mutationFn: login,
      onSuccess: () => {

        toast("Success", {
          description: "Sucessfully logged in"
        })
        onSuccess?.();

      }
  });


  const onSubmit = async (values: LoginPayload) => {
   try {
    await mutation.mutateAsync(values)
   } catch (err) {
      const error = err as unknown as {
        type: string,
        message: string,
        error: string,
      }

      if(error.message?.includes("NetworkError")){
        toast("Networ Error", {
          description: "Unable to connect to the server."
        })
     }

     if(error.error === "Invalid credentials"){
      toast("Error", {
        description: "Invalid email or password"
      })
     }
   }
  }

  return {
    form,
    mutation,
    onSubmit
  }
}
