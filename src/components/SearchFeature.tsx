import { useState } from "react";
import { Search } from "lucide-react"; // icon đẹp hơn

const SearchFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Mango",
    "Pineapple",
    "Watermelon",
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Search Feature</h1>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
      </div>
    </div>
  );
};

export default SearchFeature;
