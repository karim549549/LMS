"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import React from "react";

interface AuthAlertProps {
  errorList: string[];
  showAllErrors: boolean;
  setShowAllErrors: (v: boolean) => void;
  type?: 'error' | 'success';
}

export default function AuthAlert({ errorList, showAllErrors, setShowAllErrors, type = 'error' }: AuthAlertProps) {
  if (!errorList.length) return null;
  const isSuccess = type === 'success';
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key="alert"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={
          isSuccess
            ? "bg-gradient-to-br from-green-500/5 to-green-500/10 p-3 border-1 border-green-400 rounded-lg mb-4 shadow-sm text-xs w-full"
            : "bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-3 border-1 border-amber-400 rounded-lg mb-4 shadow-sm text-xs w-full"
        }
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isSuccess ? (
              <svg
                className="w-5 h-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500" />
            )}
            <span
              className={
                isSuccess
                  ? "truncate text-green-700 font-medium text-xs"
                  : "truncate text-amber-700 font-medium text-xs"
              }
            >
              {errorList[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={
                isSuccess
                  ? "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-200 text-green-800"
                  : "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-200 text-amber-800"
              }
            >
              {errorList.length}
            </span>
            {!isSuccess && errorList.length > 1 && (
              <button
                type="button"
                onClick={() => setShowAllErrors(!showAllErrors)}
                className="text-amber-600 cursor-pointer hover:text-amber-800 transition-colors"
                aria-label={showAllErrors ? "Hide details" : "Show all errors"}
              >
                {showAllErrors ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {!isSuccess && showAllErrors && errorList.length > 1 && (
            <motion.div
              key="error-list"
              initial={{ height: 0, opacity: 0, y: -5 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -5 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-2 list-disc list-inside text-amber-700 pl-7 text-xs">
                {errorList.slice(1).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
} 