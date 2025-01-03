import { Wine } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-rose-100 to-teal-100 shadow-md">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <Wine className="w-12 h-12 text-rose-600 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800 font-serif">WineNow</h1>
        <p className="text-sm text-gray-600 mt-1">자신만의 시음노트를 기록하세요</p>
      </div>
    </header>
  )
}

