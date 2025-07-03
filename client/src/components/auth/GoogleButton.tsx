"use client";
import { Loader2 } from "lucide-react";
import React from "react";


export default function GoogleButton() {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="w-full cursor-pointer tranition-all  flex items-center justify-center gap-2 border border-sky-300 rounded-md py-2 font-semibold bg-gradient-to-r  hover:from-blue-500  hover:to-blue-700   text-xs  hover:text-white transition-all duration-150 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_17_40)">
            <path d="M47.5 24.5C47.5 22.8 47.3 21.2 47 19.7H24V28.3H37.2C36.7 31.1 34.9 33.4 32.2 34.9V40H39.7C44.1 36.1 47.5 30.8 47.5 24.5Z" fill="#4285F4"/>
            <path d="M24 48C30.5 48 35.9 45.9 39.7 40L32.2 34.9C30.2 36.2 27.5 37.1 24 37.1C17.7 37.1 12.2 32.9 10.4 27.3H2.6V32.6C6.4 40.1 14.5 48 24 48Z" fill="#34A853"/>
            <path d="M10.4 27.3C9.9 25.8 9.6 24.2 9.6 22.5C9.6 20.8 9.9 19.2 10.4 17.7V12.4H2.6C0.9 15.7 0 19.1 0 22.5C0 25.9 0.9 29.3 2.6 32.6L10.4 27.3Z" fill="#FBBC05"/>
            <path d="M24 9.9C27.8 9.9 30.7 11.2 32.7 13.1L39.9 6C35.9 2.3 30.5 0 24 0C14.5 0 6.4 7.9 2.6 15.4L10.4 20.7C12.2 15.1 17.7 9.9 24 9.9Z" fill="#EA4335"/>
          </g>
          <defs>
            <clipPath id="clip0_17_40">
              <rect width="48" height="48" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )}
      <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
    </button>
  );
}