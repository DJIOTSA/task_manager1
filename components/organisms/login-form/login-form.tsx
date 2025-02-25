"use client";

import React from "react";
import useLoginForm from "./use-login-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();

  const { form, onSubmit, mutation } = useLoginForm({
    onSuccess: () => {
      router.push("/tasks");
    },
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Login</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="....." {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={mutation.isLoading} type="submit">
            {mutation.isLoading ? "Logging..." : "Login"}
          </Button>
          <Link aria-disabled={mutation.isLoading}
            href={"/auth/register"}
            className="text-blue-500 ml-3 text-right text-sm"
          >
            {"Don't have an account? Sign up"}
          </Link>
        </form>
      </Form>
    </div>
  );
}
