import { ReactNode } from 'react'
import { Wine } from 'lucide-react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  icon: ReactNode
}

export function PageLayout({ children, title, icon }: PageLayoutProps) {
  return (
    <div className="space-y-6 bg-gradient-to-br from-amber-50 to-rose-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-primary text-center mb-8 flex items-center justify-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h1>
      {children}
    </div>
  )
}

