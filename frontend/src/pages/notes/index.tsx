import React, { useState, useEffect } from "react";
import { fetchNotes } from "@/app/api/api";
import NoteCard from "@/components/NoteCard";
import NoteFilter from "@/components/NoteFilter";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
        setFilteredNotes(data);
      } catch (error) {
        console.error("노트 로드 중 오류 발생:", error);
      }
    };

    loadNotes();
  }, []);

  const handleFilter = (filters: any) => {
    const filtered = notes.filter((note) => {
      return (
        (!filters.keyword || note.wine_name.includes(filters.keyword)) &&
        (!filters.date || note.tasting_date === filters.date) &&
        (!filters.wineType || note.wine_type === filters.wineType) &&
        (!filters.country || note.country === filters.country)
      );
    });
    setFilteredNotes(filtered);
  };

  return (
    <div className="space-y-4">
      <NoteFilter onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
