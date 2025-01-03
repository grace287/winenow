'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TastingNoteDetail from '@/components/TastingNoteDetail'
import { fetchNoteById, updateNote, deleteNote } from '@/app/api/api'
import { TastingNote } from '@/types'


function handleView(id: number) {
  const router = useRouter()
  router.push(`/notes/${id}`)
}

export default function NoteDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const [note, setNote] = useState<TastingNote | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNote = async () => {
      if (id) {
        try {
          const data = await fetchNoteById(Number(id))
          setNote(data)
        } catch (error) {
          console.error('Failed to fetch note:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadNote()
  }, [id])

 const handleUpdate = async (updatedNote: TastingNote) => {
    try {
      await updateNote(updatedNote.id, updatedNote)
      setNote(updatedNote)
      alert('노트가 성공적으로 업데이트되었습니다!')
    } catch (error) {
      console.error('Failed to update note:', error)
      alert('노트 업데이트 중 문제가 발생했습니다.')
    }
  }

  const handleDelete = async (noteId: number) => {
    try {
      await deleteNote(noteId)
      alert('노트가 성공적으로 삭제되었습니다!')
      router.push('/notes')
    } catch (error) {
      console.error('Failed to delete note:', error)
      alert('노트 삭제 중 문제가 발생했습니다.')
    }
  }

  if (isLoading) return <p>로딩 중...</p>
  if (!note) return <p>노트를 찾을 수 없습니다.</p>

  return (
    <div className="p-4">
      <TastingNoteDetail
        note={note}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClose={() => router.push('/notes')}
      />
    </div>
  )
}

export default function NoteDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [note, setNote] = useState(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNoteById(id as string);
        setNote(data);
      } catch (error) {
        console.error("노트 로드 중 오류 발생:", error);
      }
    };

    if (id) loadNote();
  }, [id]);

  if (!note) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{note.wine_name}</h1>
      <p>와인 종류: {note.wine_type}</p>
      <p>와인 품종: {note.wine_varietal}</p>
      <p>국가: {note.country}</p>
      <p>와이너리: {note.winery}</p>
      <p>빈티지: {note.vintage}</p>
      <p>테이스팅 날짜: {note.tasting_date}</p>
      <p>테이스팅 장소: {note.tasting_place}</p>
      <p>투명도: {note.appearance_clarity}</p>
      <p>색의 강도: {note.appearance_intensity}</p>
      <p>향의 강도: {note.aroma_intensity}</p>
      <p>아로마 노트: {note.aroma_notes}</p>
      <p>당도: {note.sweetness}</p>
      <p>산도: {note.acidity}</p>
      <p>탄닌: {note.tannin}</p>
      <p>바디: {note.body}</p>
      <p>종합 평가: {note.overall}</p>
    </div>
  );
}
