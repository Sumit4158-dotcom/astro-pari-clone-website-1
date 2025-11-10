"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Shield,
  User,
  Mail,
  Lock,
  LogOut,
  Settings,
  CheckCircle,
} from "lucide-react";

interface AdminData {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [updateFormData, setUpdateFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      toast.error("Please login first");
      router.push("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/admin/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAdmin(data.admin);
        setUpdateFormData({
          username: data.admin.username,
          email: data.admin.email,
          currentPassword: "",
          newPassword: "",
        });
      } else {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      }
    } catch (error) {
      toast.error("Failed to verify session");
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("admin_token");

    if (token) {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const token = localStorage.getItem("admin_token");

    if (!token) {
      toast.error("Session expired");
      router.push("/admin/login");
      return;
    }

    try {
      // Build update payload
      const payload: any = {};

      if (updateFormData.username !== admin?.username) {
        payload.username = updateFormData.username;
      }

      if (updateFormData.email !== admin?.email) {
        payload.email = updateFormData.email;
      }

      if (updateFormData.newPassword) {
        payload.currentPassword = updateFormData.currentPassword;
        payload.newPassword = updateFormData.newPassword;
      }

      // Check if any updates provided
      if (Object.keys(payload).length === 0) {
        toast.error("No changes to update");
        setIsUpdating(false);
        return;
      }

      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Credentials updated successfully!");
        setAdmin(data.admin);
        setUpdateFormData({
          username: data.admin.username,
          email: data.admin.email,
          currentPassword: "",
          newPassword: "",
        });
        setShowUpdateForm(false);
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update credentials");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">AstroPari</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFED4E] rounded-xl p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-[#FFD700]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Welcome, {admin?.username}!
                </h2>
                <p className="text-gray-800">Admin Panel - Full Access</p>
              </div>
            </div>
          </div>

          {/* Admin Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#FFD700]" />
                Account Information
              </h3>
              <Button
                onClick={() => setShowUpdateForm(!showUpdateForm)}
                variant="outline"
                size="sm"
              >
                {showUpdateForm ? "Cancel" : "Update Credentials"}
              </Button>
            </div>

            {!showUpdateForm ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Username</p>
                    <p className="font-semibold">{admin?.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold">{admin?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-username">Username</Label>
                  <Input
                    id="update-username"
                    type="text"
                    value={updateFormData.username}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        username: e.target.value,
                      })
                    }
                    placeholder="Enter new username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-email">Email</Label>
                  <Input
                    id="update-email"
                    type="email"
                    value={updateFormData.email}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter new email"
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Change Password (Optional)
                  </p>

                  <div className="space-y-2 mb-3">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={updateFormData.currentPassword}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={updateFormData.newPassword}
                      onChange={(e) =>
                        setUpdateFormData({
                          ...updateFormData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-[#FFED4E] text-black font-semibold"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold mb-2">User Management</h4>
              <p className="text-sm text-gray-600 mb-4">
                Manage website users and their accounts
              </p>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full"
              >
                Go to Main Site
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold mb-2">System Settings</h4>
              <p className="text-sm text-gray-600 mb-4">
                Configure admin panel settings
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
