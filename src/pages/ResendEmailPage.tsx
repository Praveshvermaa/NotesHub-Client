import { useState } from "react";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ResendEmailPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    if (!email) return toast.error("Please enter your email");
  
    const toastId = toast.loading("Sending verification email...");
    try {
      setLoading(true);
      await api.post("/auth/resend-verification", { email });
      toast.success("Verification email resent!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend email", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-md text-center">
        <CardContent className="flex flex-col items-center space-y-6">
          <h2 className="text-lg font-semibold">Resend Verification Email</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          <Button onClick={handleResend} disabled={loading}>
            {loading ? "Sending..." : "Resend Email"}
          </Button>
          <Button onClick={() => navigate("/login")} variant="outline">
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResendEmailPage;
