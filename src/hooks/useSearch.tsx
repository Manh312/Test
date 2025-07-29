import { useState, useEffect } from "react";

export const useSearch = (items: string[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>(items);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const results = items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
      setIsLoading(false);
    }, 14); // 14ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, items]);

  return { searchTerm, setSearchTerm, filteredItems, isLoading };
};