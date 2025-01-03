import React from "react";
import { useRouter } from "next/router";

export default function NoteCard({ note }: { note: any }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/notes/${note.id}`);
  };

  return (
      <div onClick={handleClick} className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100">
          <h2 className="text-lg font-bold">{note.wine_name}</h2>
          <p>와이너리: {note.winery}</p>
          <p>테이스팅 날짜: {note.tasting_date}</p>
          <p>국가: {note.country}</p>
      </div>
    <button
        onClick={(e) => {
            e.stopPropagation();
            if (confirm("이 노트를 삭제하시겠습니까?")) {
                deleteNote(note.id);
                alert("노트가 삭제되었습니다.");
                location.reload();
            }
        }}
        className="text-red-500"
    >
        삭제
    </button>

);
}
