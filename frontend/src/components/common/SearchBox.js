import React from "react";
import { Search } from "lucide-react";

const SearchBox = ({ value, onChange }) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="搜索产品..."
                className="transition-all bg-gray-300 text-black placeholder-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onChange}
                value={value}
            />
            <Search
                className="absolute left-3 top-2.5 text-gray-600"
                size={18}
            />
        </div>
    );
};

export default SearchBox;
