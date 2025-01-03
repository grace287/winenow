'use client';

import { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from 'date-fns';
import { TastingNoteForm } from '@/components/TastingNoteForm'; // 노트 추가 폼 컴포넌트
import { ko } from 'date-fns/locale';
import { fetchNotes, createNote } from '@/app/api/api';

interface TastingNote {
    id: number;
    wine_name: string;
    tasting_date: string; // YYYY-MM-DD
    winery: string;
    vintage: string;
    overall: string;
}


// 예시 데이터

const exampleNotes = [
  {
    id: 1,
    wine_name: 'Château Margaux',
    tasting_date: '2025-01-01',
    winery: 'Château Margaux',
    vintage: '2015',
    note: 'Rich and complex wine with deep flavors of blackberry.',
  },
  {
    id: 2,
    wine_name: 'Opus One',
    tasting_date: '2025-01-05',
    winery: 'Opus One Winery',
    vintage: '2018',
    note: 'Elegant wine with balanced tannins and a smooth finish.',
  },
  {
    id: 3,
    wine_name: 'Penfolds Grange',
    tasting_date: '2025-01-10',
    winery: 'Penfolds',
    vintage: '2019',
    note: 'Full-bodied wine with vibrant flavors of plum and spice.',
  },
];

export default function TastingCalendar() {
    const [notes, setNotes] = useState<TastingNote[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [notesForSelectedDate, setNotesForSelectedDate] = useState<TastingNote[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // 폼 표시 여부


     // Fetch notes from API
      useEffect(() => {
        const loadNotes = async () => {
          try {
            const data = await fetchNotes();
            setNotes(data);
          } catch (error) {
            console.error('Failed to fetch notes:', error);
          }
        };

        loadNotes();
      }, []);

    // Update notes for selected date
      useEffect(() => {
        if (selectedDate) {
          const filteredNotes = notes.filter(note =>
            isSameDay(new Date(note.tasting_date), selectedDate)
          );
          setNotesForSelectedDate(filteredNotes);
        }
      }, [selectedDate, notes]);

      // Handle new note creation
      const handleAddNote = async (newNote: TastingNote) => {
        try {
          const savedNote = await createNote(newNote); // API 호출로 노트 저장
          setNotes([...notes, savedNote]); // 저장된 노트를 상태에 추가
          setIsFormVisible(false); // 폼 닫기
        } catch (error) {
          console.error('Failed to save note:', error);
        }
      };

    return (
        <div className="space-y-6 p-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">내 시음 노트</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ko}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>

            {/* 선택된 날짜의 노트 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko }) : '날짜를 선택하세요'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notesForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {notesForSelectedDate.map(note => (
                    <Card key={note.id} className="p-4 shadow-md border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800">{note.wine_name}</h3>
                      <p className="text-sm text-gray-600">테이스팅 날짜: {note.tasting_date}</p>
                      <p className="text-sm text-gray-600">{note.overall}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">이 날짜에 기록된 시음 노트가 없습니다.</p>
              )}
            </CardContent>
            <button
              onClick={() => setIsFormVisible(true)}
              className="mt-4 bg-rose-500 text-white px-4 py-2 rounded"
            >
              시음 노트 추가
            </button>
          </Card>

            {/* 노트 추가 폼 */}
          {isFormVisible && (
            <TastingNoteForm
              onClose={() => setIsFormVisible(false)}
              onSave={(newNote) => handleAddNote({ ...newNote, tasting_date: format(selectedDate!, 'yyyy-MM-dd') })}
            />
          )}

        </div>
    );
}


export default function CalendarWithNotes() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const notesForSelectedDate = exampleNotes.filter((note) =>
    selectedDate && isSameDay(new Date(note.tasting_date), selectedDate)
  );

  return (
    <div className="p-4 space-y-4">
      {/* 달력 컴포넌트 */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ko}
        className="rounded-md border border-gray-300"
      />

      {/* 선택된 날짜에 대한 노트 표시 */}
      <div>
        <h2 className="text-lg font-bold text-rose-700">
          {selectedDate ? format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko }) : '날짜를 선택하세요'}
        </h2>

        {notesForSelectedDate.length > 0 ? (
          notesForSelectedDate.map((note) => (
            <Card key={note.id} className="p-4 mt-4 bg-rose-50">
              <h3 className="text-md font-semibold text-rose-700">{note.wine_name}</h3>
              <p>와이너리: {note.winery}</p>
              <p>빈티지: {note.vintage}</p>
              <p>{note.note}</p>
            </Card>
          ))
        ) : (
          <p className="mt-4 text-gray-500">이 날짜에 기록된 노트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

import { fetchNotes } from '@/app/api/api';

useEffect(() => {
  const loadNotes = async () => {
    const data = await fetchNotes();
    setNotes(data);
  };

  loadNotes();
}, []);



// data



export default function Calendar({ notes }) {
  return (
    <div className="calendar">
      {notes.map((note) => (
        <div key={note.id} className="note">
          <p>{note.wine_name}</p>
          <p>{note.tasting_date}</p>
        </div>
      ))}
    </div>
  );
}

export default function TastingCalendar() {
    const [notes, setNotes] = useState<TastingNote[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [notesForSelectedDate, setNotesForSelectedDate] = useState<TastingNote[]>([]);

    useEffect(() => {
        // Fetch notes from the API
        const getNotes = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            }
        };
        getNotes();
    }, []);

    useEffect(() => {
        // Filter notes for the selected date
        if (selectedDate) {
            const filteredNotes = notes.filter(note =>
                isSameDay(new Date(note.tasting_date), selectedDate)
            );
            setNotesForSelectedDate(filteredNotes);
        }
    }, [selectedDate, notes]);

    return (
        <div className="space-y-6 p-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">내 시음 노트</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ko}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>
                        {selectedDate ? format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko }) : '날짜를 선택하세요'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                {notesForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                        {notesForSelectedDate.map(note => (
                            <Card key={note.id} className="p-4 shadow-md border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800">{note.wine_name}</h3>
                                <p className="text-sm text-gray-600">테이스팅 날짜: {note.tasting_date}</p>
                                <p className="text-sm text-gray-600">{note.overall}</p>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">이 날짜에 기록된 시음 노트가 없습니다.</p>
                )}
            </CardContent>
            </Card>
        </div>
    );
}
