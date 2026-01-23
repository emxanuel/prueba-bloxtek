"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/api/services/auth.service";

export default function WelcomeUser() {
  const { user, clearAuth, token } = useAuthStore();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    setIsLoggingOut(true);
    authService.logout(token || "").then(() => {
      clearAuth();
      router.push("/login");
      setIsLoggingOut(false);
    }).catch(() => {
      clearAuth();
      router.push("/login");
      setIsLoggingOut(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 mb-6">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              You&apos;re successfully signed in to your account
            </p>
          </div>

          <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl p-6 mb-8 border border-indigo-100">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <svg 
                    className="w-5 h-5 text-indigo-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base text-gray-900 font-semibold">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <svg 
                    className="w-5 h-5 text-indigo-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-900 font-semibold">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`
                flex-1 py-3 px-6 rounded-lg font-semibold text-white
                bg-linear-to-r from-red-500 to-red-600
                hover:from-red-600 hover:to-red-700
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                transition-all duration-200 shadow-md hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md
                flex items-center justify-center gap-2
              `}
            >
              {isLoggingOut ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing out...
                </>
              ) : (
                <>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  Sign out
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}