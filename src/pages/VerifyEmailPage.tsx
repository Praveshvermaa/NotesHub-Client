import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const VerifyEmailPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`/verify-email/${token}`);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    if (token) verifyEmail();
  }, [token]);

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResend = () => {
    navigate("/resend-verification");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-md text-center">
        <CardContent className="flex flex-col items-center space-y-6">
          {status === "loading" && (
            <>
              <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
              <p className="text-sm text-muted-foreground">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <h2 className="text-lg font-semibold">Email Verified!</h2>
              <p className="text-sm text-muted-foreground">You can now log in to your account.</p>
              <Button onClick={handleBackToLogin}>Back to Login</Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-lg font-semibold">Invalid or Expired Link</h2>
              <p className="text-sm text-muted-foreground">Please try again or contact support.</p>

              <div className="flex flex-col space-y-3 w-full">
                <Button onClick={handleBackToLogin} variant="outline">
                  Back to Login
                </Button>
                <Button onClick={handleResend} variant="secondary">
                  Resend Email
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
