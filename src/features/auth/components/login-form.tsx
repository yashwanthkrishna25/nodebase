"use client";

import { zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {toast} from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
// import {authClient} from "@/lib/auth-client";

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 6 characters long"),
})

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    }) ;

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/",
        } , {
            onSuccess: () => {
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message );
            },
        });
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
         <Card>
            <CardHeader className="text-center">
                 <CardTitle>
                    Welcome back
                 </CardTitle>
                 <CardDescription>
                    Login to continue
                 </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit (onSubmit)}>
                        <div className="grid gap-6">
                           <div className="flex flex-col gap-4">
                            <Button
                            variant="outline"
                            className="w-full"
                            type="button"
                            disabled={isPending}
                            >
                                Continue with GitHub                             
                                </Button>
                                     <Button
                            variant="outline"
                            className="w-full"
                            type="button"
                            disabled={isPending}
                            >
                                Continue with Google                            
                                </Button>
                                </div> 
                        </div>
                        
                        <div className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="n@example.com" {...field} />
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
                                        <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                Login
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup"
                            className="underline underline-offset-4">Sign up</Link>

                        </div>
                    </form>
                    </Form>
            </CardContent>
         </Card>
       </div>
    );
};