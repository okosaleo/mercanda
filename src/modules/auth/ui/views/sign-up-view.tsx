"use client";

import { zodResolver }  from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "../../schema";
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


export const SignUpView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        toast.success("Welcome to Mercanda, you just created an account")
        router.push("/")
    },
}
));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values);

    }

    const username= form.watch("username");
    const usernameErrors = form.formState.errors.username;

    const showPreview = username && !usernameErrors
 
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
                                <Link href="/sign-in">
                                Sign In
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">
                                Join over 1000+ creators making money on Mercanda.
                            </h1>
                            <FormField 
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-base">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription
                                    className={cn("hidden", showPreview && "block")}
                                    >
                                        Your store will be available at &nbsp;
                                        <strong>{username}</strong>.mercanda.store
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
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
                            <Button disabled={register.isPending} type="submit">
  {register.isPending ? "Creating Account..." : "Create Account"}
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


