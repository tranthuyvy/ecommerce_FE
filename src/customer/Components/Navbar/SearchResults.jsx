import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../Product/ProductCard/ProductCard"; // Import ProductCard component

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q"); // Trích xuất tham số truy vấn 'q'

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Thực hiện tìm kiếm sản phẩm dựa trên searchQuery
    // Set searchResults với kết quả tìm kiếm
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results for: {searchQuery}</h1>
      <ul>
        {searchResults.map((product) => (
          <li key={product.id}>
            {/* Sử dụng ProductCard để hiển thị từng sản phẩm */}
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
