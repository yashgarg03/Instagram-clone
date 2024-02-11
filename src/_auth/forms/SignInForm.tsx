import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";


const SignInForm = () => {
  const isLoading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <div className="flex-center flex-col sm:w-420">
        <img src="/public/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular my-2">
          Welcome Back! Please enter login details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col flex w-full gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-rose-600"/>
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-rose-600" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex">
                <Loader /> Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-small-primary text-center">Didn't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold"> Sign Up</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
