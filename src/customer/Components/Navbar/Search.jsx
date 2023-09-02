import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // Sử dụng useNavigate
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      // Chuyển hướng đến trang hiển thị sản phẩm liên quan với searchQuery
      navigate(`/search?q=${searchQuery}`);
    };
  
    return (
      <form onSubmit={handleSearchSubmit} className="flex">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 text-gray-400 hover:text-gray-500"
        />
        <button type="submit">
          <span className="sr-only">Search</span>
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </form>
    );
  }
  

export default Search;
