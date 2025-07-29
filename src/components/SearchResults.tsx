interface SearchResultsProps {
  filteredItems: string[];
}

const SearchResults = ({ filteredItems }: SearchResultsProps) => {
  return (
    <ul className="divide-y divide-gray-200">
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <li key={index} className="py-2 text-gray-700 hover:text-blue-600 transition">
            {item}
          </li>
        ))
      ) : (
        <li className="py-2 text-gray-400 italic">No items found</li>
      )}
    </ul>
  );
};

export default SearchResults;