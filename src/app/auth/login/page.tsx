'use client'
import { Separator } from "@/app/_components/ui/separator";
import { TLoginForm, loginFormSchema } from "@/zod/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

export default function() {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: TLoginForm) => {
    await signIn("credentials", { ...values, redirect: false })
    router.push("/")
  }

  return (
    <>
      <Card className="relative border border-muted/20 max-w-[25rem]">
        <CardHeader>
          <CardTitle className="text-4xl font-medium">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
              <div>
                <span>By continuing, you agree to Amazon&apos;s{" "}</span>
                <Button variant="link" className="p-0 text-xs h-fit">Condition of Use</Button>
                <span>{" "}and{" "}</span>
                <br />
                <Button variant="link" className="p-0 text-xs h-fit">Privacy Notice.</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <div className="flex items-center gap-2 w-[90%] mx-auto py-2">
          <Separator className="flex-1" />
          <span className="shrink-0">Or sign in with</span>
          <Separator className="flex-1" />
        </div>
        <CardFooter className="block">
          <Button variant="outline" onClick={async () => {
            await signIn("google");
          }} className="flex gap-1 w-full">
            <FaGoogle className="w-4 h-4" />
            <span>
              Sign in
            </span>
          </Button>
        </CardFooter>
        <div className="flex absolute -bottom-6 gap-2 items-center w-full">
          <Separator className="flex-1" />
          <span className="shrink-0">New to Amazon?</span>
          <Separator className="flex-1" />
        </div>
      </Card>
      <Link href="/auth/sign-up" className={buttonVariants({
        className: "h-8 w-[20rem] relative top-4",
        variant: "outline"
      })}>Create your account</Link>
    </>
  );
}
