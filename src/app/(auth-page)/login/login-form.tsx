"use client";

import { signIn } from "next-auth/react";
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
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl,
      });

      if (!res?.error) {
        toast({
          title: "Selamat datang kembali!",
          description: "Berhasil masuk.",
          className: "bg-green-600 text-foreground",
        });
        router.replace(callbackUrl);
      } else {
        reset({ password: "" });
        const message = "Email atau sandi tidak valid!";
        toast({
          title: "Terjadi kesalahan...",
          description: message,
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
            <CardTitle>Selamat Datang!</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pb-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-muted/10" />
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
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} className="bg-muted/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="link"
              disabled={form.formState.isSubmitting}
              className="text-destructive"
              size="sm"
              onClick={() => router.push("/reset-password")}
              type="button"
            >
              Lupa Sandi
            </Button>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button
              disabled={form.formState.isSubmitting}
              variant="outline"
              onClick={() => router.replace("/register")}
              type="button"
              className="flex-1"
            >
              Daftar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              {form.formState.isSubmitting ? "Memuat..." : "Masuk"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
