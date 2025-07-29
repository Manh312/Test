import BackButton from "../components/BackButton";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import { useSearch } from "../hooks/useSearch";

const items = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Mango",
  "Pineapple",
  "Watermelon",
];

const SearchFeature = () => {
  const { searchTerm, setSearchTerm, filteredItems, isLoading } = useSearch(items);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <BackButton />
        <h1 className="text-2xl font-semibold text-center text-gray-800 mt-5">Search Feature</h1>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLoading={isLoading} />
        <SearchResults filteredItems={filteredItems} />
      </div>
    </div>
  );
};

export default SearchFeature;