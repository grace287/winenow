import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchNoteById, updateNote } from "@/app/api/api";
import TastingNoteForm from "@/components/TastingNoteForm";

export default function EditNote() {
  const router = useRouter();
  const { id } = router.query;

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNoteById(id);
        setNote(data);
        setError("");
      } catch (err) {
        setError("노트를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadNote();
  }, [id]);

  const handleSubmit = async (updatedNote) => {
    try {
      await updateNote(id, updatedNote);
      alert("노트가 수정되었습니다.");
      router.push(`/notes/${id}`);
    } catch (err) {
      alert("노트 수정 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">노트 수정</h1>
      <TastingNoteForm initialData={note} onSubmit={handleSubmit} />
    </div>
  );
}
