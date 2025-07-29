import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLoading: boolean;
}

const SearchInput = ({ searchTerm, setSearchTerm, isLoading }: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      {isLoading && (
        <div className="absolute right-3 top-2.5">
          <LoadingSpinner />
        </div>
      )}
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;