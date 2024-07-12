"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input, PasswordInput } from "@/components/ui/input";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

interface UserResetPasswordFormProps {
  userId: string;
}
export default function UserResetPasswordForm({
  userId,
}: UserResetPasswordFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PUT",
        body: JSON.stringify({ ...values, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        router.replace("/login");
        toast({
          title: "Sukses!",
          description:
            "Kata sandi telah di reset, silahkan masuk kembali menggunakan sandi baru.",
          className: "bg-green-600 text-foreground",
          duration: 8000,
        });
      } else {
        toast({
          title: "Terjadi kesalahan...",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Terjadi kesalahan...",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full p-4 flex flex-col items-stretch"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-start space-y-4">
              <span>Reset Kata Sandi</span>
            </CardTitle>
            <CardDescription>Masukan kata sandi baru</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pb-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi Baru</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      type="password"
                      className="bg-muted/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              {form.formState.isSubmitting
                ? "Memuat..."
                : "Perbarui Kata Sandi"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
