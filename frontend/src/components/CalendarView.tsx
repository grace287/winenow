import { useState, useEffect } from 'react';
import Calendar from './calendar'; // 달력 UI 컴포넌트
import TastingNoteForm from './TastingNoteForm';
import { fetchNotes } from '@/app/api/api';

export default function CalendarView() {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API에서 데이터 가져오기
  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  // 새 노트 추가 후 데이터 새로고침
  const handleNoteAdded = async () => {
    const data = await fetchNotes();
    setNotes(data);
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        notes={notes} // 달력에 표시할 데이터 전달
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary text-white">
        새 노트 추가
      </button>

      {isModalOpen && (
        <TastingNoteForm
          onClose={() => setIsModalOpen(false)}
          onNoteAdded={handleNoteAdded} // 노트 추가 후 새로고침
        />
      )}
    </div>
  );
}
