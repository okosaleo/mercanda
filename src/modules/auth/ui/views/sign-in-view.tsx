"use client";

import { zodResolver }  from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../../schema";
import { useForm } from "react-hook-form";
import * as z from "zod"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const SignInView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();


    const login = useMutation(trpc.auth.login.mutationOptions({
        onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        toast.success("Welcome back to Mercanda")
        router.push("/")
    },
}
));

    const form = useForm<z.infer<typeof loginSchema>>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login.mutate(values);

    }

 
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className=" h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 p-4 lg:p-12"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/">
                            <span className="text-2xl font-semibold">
                                Mercanda
                            </span>
                            </Link>
                            <Button asChild className="text-base underline">
                                <Link href="/sign-up">
                                Sign Up
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">
                                Welcome back to Mercanda.
                            </h1>
                            <FormField 
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-base">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField 
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-base">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button disabled={login.isPending} type="submit">
  {login.isPending ? "Logging In..." : "Login"}
</Button>
                    </form>
                </Form>
            </div>
            <div
            style={{ 
                backgroundImage: "url('/sign.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
             className="h-screen w-full lg:col-span-2 hidden lg:block" />
        </div>
    )
}


