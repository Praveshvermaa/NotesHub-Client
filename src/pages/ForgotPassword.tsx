import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import api from "@/lib/api";

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export default function ForgotPassword() {
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await api.post("/auth/forgot-password", data);
      toast.success(res.data.message, { id: toastId });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { id: toastId });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
