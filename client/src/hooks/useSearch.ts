// hooks/useSearch.ts
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecentSearch } from "@/hooks/useRecentSearch";

export const useSearch = (
  initialTerm: string,
  searchFn: (query: string) => Promise<string[]>
) => {
  const [query, setQuery] = useState(initialTerm);
  const debouncedQuery = useDebounce(query, 500);
  const [loading, setLoading] = useState<boolean>(false);
  const { recentSearches, addSearch, clearSearches, removeSearch } = useRecentSearch();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    if (!debouncedQuery) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const runSearch = async () => {
      try {
        const results = await searchFn(debouncedQuery);
        setSearchResults(results);
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [debouncedQuery, searchFn]);

  const selectResult = (value: string) => {
    addSearch(value);
    setQuery("");
  };

  return {
    query,
    setQuery,
    searchResults,
    recentSearches,
    addSearch,
    clearSearches,
    removeSearch,
    selectResult,
    loading,
  };
};
