import { useState, useEffect } from "react";

export const RECENT_SEARCHES_KEY = "recentSearches";
export const useRecentSearch = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const addSearch = (searchTerm: string) => {
    if (!searchTerm) return;
    setRecentSearches((prev) => {
      const updated = [searchTerm, ...prev.filter((s) => s !== searchTerm)].slice(0, 5);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const removeSearch = (searchTerm: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((search) => search !== searchTerm);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };
  return { recentSearches, addSearch, clearSearches, removeSearch };
};
