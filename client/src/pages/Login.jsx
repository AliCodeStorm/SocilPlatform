import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", {
        email: emailOrUsername,
        password,
      });

      const {token, refreshToken } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md mt-16">
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email or username to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="example@email.com or johndoe"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/register" className="hover:underline text-primary">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
