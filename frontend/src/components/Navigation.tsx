'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart2, Users, Image, User } from 'lucide-react'

const links = [
  { href: '/', label: '홈', icon: Home },
  // { href: '/dashboard', label: '대시보드', icon: BarChart2 },
  { href: '/community', label: '커뮤니티', icon: Users },
  { href: '/gallery', label: '갤러리', icon: Image },
  { href: '/mypage', label: '내 정보', icon: User },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center p-2 rounded-md ${
                pathname === link.href
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <link.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

