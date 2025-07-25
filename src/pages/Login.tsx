import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";
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
import { toast } from "sonner";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function Login() {
  const form = useForm<any>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [notVerified,setnotverified]=useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  async function onSubmit(data: any) {
    
    const toastId = toast.loading("Processing...");
  
    try {
      const res = await api.post("/auth/login", data);
  
      if (res.data.success) {
        toast.success("Login Successful!", { id: toastId });
        login();
        navigate("/dashboard");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message, { id: toastId });
      if (err?.response?.data?.notVerified) {
        setnotverified(true);
      }
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      {...field}
                    />
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
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <div className="text-right mt-1">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline hover:text-blue-800">
            Sign up
          </Link>
        </p>

        {notVerified?<p className="text-center text-sm">
          If your email is not verified?{" "}
          <Link to="/resend-verification" className="text-blue-600 underline hover:text-blue-800">
            Verify email
          </Link>
        </p>:""}
      </div>
    </div>
  );
}

export default Login;
