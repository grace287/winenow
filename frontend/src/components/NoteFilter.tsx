import React, { useState } from "react";

export default function NoteFilter({ onFilter }: { onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    keyword: "",
    date: "",
    wineType: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="flex flex-wrap space-y-4">
      <input
        type="text"
        name="keyword"
        placeholder="검색어 입력"
        value={filters.keyword}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <select name="wineType" value={filters.wineType} onChange={handleChange} className="p-2 border rounded">
        <option value="">와인 종류</option>
        <option value="red">레드</option>
        <option value="white">화이트</option>
        <option value="sparkling">샴페인</option>
        <option value="rose">로제</option>
        <option value="fortified">주정강화</option>
        <option value="other">기타</option>
      </select>
      <select name="country" value={filters.country} onChange={handleChange} className="p-2 border rounded">
        <option value="">국가 선택</option>
        {[
          "France",
          "Italy",
          "USA",
          "Spain",
          "Argentina",
          "Australia",
          "Chile",
          "South Africa",
          "Germany",
          "Portugal",
          "New Zealand",
          "Other",
        ].map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <button onClick={handleFilter} className="p-2 bg-blue-500 text-white rounded">
        필터 적용
      </button>
    </div>
  );
}
