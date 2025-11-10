"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("admin_token");
    if (token) {
      fetch("/api/admin/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          router.push("/admin/dashboard");
        }
      });
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.usernameOrEmail || !formData.password) {
      toast.error("Please enter username and password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Store admin token
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.admin));

      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFD700] via-[#FFF200] to-[#FFD700] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 text-[#FFD700]" />
          </div>
          <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
          <p className="text-gray-600 text-sm mt-2">AstroPari Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="usernameOrEmail" className="text-sm font-semibold text-gray-700">
              Username or Email
            </Label>
            <Input
              id="usernameOrEmail"
              type="text"
              placeholder="Enter username or email"
              value={formData.usernameOrEmail}
              onChange={(e) =>
                setFormData({ ...formData, usernameOrEmail: e.target.value })
              }
              className="h-12 border-gray-300 focus:border-[#FFD700] focus:ring-[#FFD700]"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-12 border-gray-300 focus:border-[#FFD700] focus:ring-[#FFD700] pr-12"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-gray-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to Admin Panel"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Default Credentials:</strong>
            <br />
            Username: <span className="font-mono">admin</span>
            <br />
            Password: <span className="font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}