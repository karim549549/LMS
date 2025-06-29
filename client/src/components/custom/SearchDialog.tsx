"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Search, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { searchApi } from "@/services/apis/searchApi";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    searchResults,
    addSearch,
    recentSearches,
    clearSearches,
    removeSearch,
    loading,
  } = useSearch("", searchApi);

  const toggleSearch = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toLowerCase().includes("mac");
    if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", toggleSearch);
    return () => window.removeEventListener("keydown", toggleSearch);
  }, [toggleSearch]);

  useEffect(() => {
    if (open) setFocusIndex(0);
  }, [open, query]);

  const handleSelectSearchResult = useCallback((result: string) => {
    addSearch(result);
    setQuery("");
    setOpen(false);
  }, [addSearch, setQuery, setOpen]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (query.length > 0) {
        // Results navigation
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setFocusIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setFocusIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && searchResults[focusIndex]) {
          e.preventDefault();
          handleSelectSearchResult(searchResults[focusIndex]);
        }
      } else {
        // Recent navigation
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setFocusIndex((prev) => Math.min(prev + 1, recentSearches.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setFocusIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && recentSearches[focusIndex]) {
          e.preventDefault();
          handleSelectSearchResult(recentSearches[focusIndex]);
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
          e.preventDefault();
          clearSearches();
        } else if (e.key === "Delete" && recentSearches[focusIndex]) {
          e.preventDefault();
          removeSearch(recentSearches[focusIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, query, searchResults, recentSearches, focusIndex, clearSearches, removeSearch, handleSelectSearchResult]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button with animated width */}
      <div className="inline-block group transition-all duration-300">
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-[300px] group-hover:w-[350px] justify-between transition-all duration-300 flex items-center gap-2 px-4 py-2 text-sm border border-neutral-300 rounded-full text-neutral-600 hover:text-neutral-800 bg-white shadow-sm overflow-hidden"
            aria-label="Open search dialog"
          >
          <div className="flex items-center gap-2 ">
            <Search className="text-neutral-500 w-4 h-4" />
            <span className="truncate">Search for anything...</span>
          </div>
            <kbd className="bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded px-2 py-1 text-xs text-neutral-500">
              Ctrl + K
            </kbd>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Find courses, assignments, students, or lessons instantly.
          </DialogDescription>
        </DialogHeader>

        {/* Input Field */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search className="text-neutral-500 w-4 h-4" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for anything..."
            className="flex-1 border-none shadow-none focus:outline-none focus:ring-0 text-sm"
            aria-label="Search"
            ref={inputRef}
          />
          <kbd className="bg-neutral-100 hover:bg-neutral-200 transition border border-neutral-300 rounded px-2 py-1 text-xs text-neutral-500">
            Esc
          </kbd>
        </div>
        <hr className="my-1" />
        {/* Results or Recent */}
        {query.length > 0 ? (
          <div className="mt-2">
            {loading ? (
              <div className="text-sm text-neutral-500 p-2 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 mr-2 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-2 ">
                {searchResults.map((result, idx) => (
                  <button
                    key={result}
                    onClick={() => handleSelectSearchResult(result)}
                    className={`flex cursor-pointer justify-between items-center p-2 text-sm rounded-md hover:bg-neutral-100 transition ${focusIndex === idx ? 'bg-blue-100' : ''}`}
                    tabIndex={-1}
                  >
                    <span>{result}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-sm text-neutral-500 p-2">
                No results found.
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-2 min-h-65">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <Clock className="text-neutral-500 w-4 h-4" />
                <span className="text-sm text-neutral-600">
                  Recent searches
                </span>
              </div>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearSearches}
                  className="cursor-pointer bg-red-500/10 p-2 rounded-md text-xs text-red-500 transition-all duration-200 hover:underline"
                  aria-label="Clear all recent searches (Ctrl+L)"
                >
                  Clear all
                </button>
              )}
            </div>
            {recentSearches.length > 0 ? (
              recentSearches.map((term, idx) => (
                <div
                  key={term}
                  className={`flex items-center justify-between p-2 hover:bg-neutral-100 rounded-md transition ${focusIndex === idx ? 'bg-blue-100' : ''}`}
                >
                  <button
                    onClick={() => handleSelectSearchResult(term)}
                    className="text-sm text-neutral-700 text-left w-full"
                    tabIndex={-1}
                  >
                    {term}
                  </button>
                  <button
                    onClick={() => removeSearch(term)}
                    className="text-red-500 hover:text-red-700 transition ml-2"
                    aria-label={`Remove ${term} (Delete)`}
                    tabIndex={-1}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-sm text-neutral-500 p-2 min-h-65">
                No recent searches found.
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
