'use client'

import { Button } from "@/components/ui/button"
import { ChromeIcon as Google } from 'lucide-react'
import { useState } from 'react';

export default function SocialLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
    console.log(isLoggedIn ? 'Logging out' : 'Logging in')
  }

  return (
    <div className="flex flex-col space-y-4">
      <Button 
        variant="outline" 
        onClick={handleLogin}
        className="flex items-center justify-center"
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Button>
    </div>
  )
}

