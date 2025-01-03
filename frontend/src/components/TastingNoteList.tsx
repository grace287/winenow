import React, { useEffect, useState } from "react";
import { fetchNotes } from "@/app/api/api";
import Link from "next/link";

export default function TastingNoteList() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
        setError("");
      } catch (err) {
        setError("노트를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (notes.length === 0) {
    return <p className="text-center text-gray-500">작성된 노트가 없습니다.</p>;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">시음 노트</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
          >
            <h3 className="text-xl font-semibold text-gray-800">{note.wine_name}</h3>
            <p className="text-gray-600">와이너리: {note.winery || "정보 없음"}</p>
            <p className="text-gray-600">빈티지: {note.vintage || "정보 없음"}</p>
            <p className="text-gray-600">테이스팅 장소: {note.tasting_place || "정보 없음"}</p>
            <p className="text-gray-600">테이스팅 날짜: {note.tasting_date || "정보 없음"}</p>
            <p className="text-gray-600 truncate">아로마: {note.aroma_notes || "정보 없음"}</p>
            <p className="text-gray-600 truncate">종합 평가: {note.overall || "정보 없음"}</p>
            <Link
              href={`/notes/${note.id}`}
              className="block mt-4 text-primary font-medium hover:underline"
            >
              상세보기 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NoteFilter({ onFilter }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="와인 이름 또는 와이너리 검색"
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

import NoteFilter from "@/components/NoteFilter";

export default function TastingNoteList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
        setFilteredNotes(data);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    loadNotes();
  }, []);

  const handleFilter = (search) => {
    const filtered = notes.filter(
      (note) =>
        note.wine_name.toLowerCase().includes(search.toLowerCase()) ||
        note.winery.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  return (
    <div>
      <NoteFilter onFilter={handleFilter} />
      <div>
        {filteredNotes.map((note) => (
          <div key={note.id}>{/* 노트 렌더링 */}</div>
        ))}
      </div>
    </div>
  );
}
