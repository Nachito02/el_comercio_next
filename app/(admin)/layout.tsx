import React from 'react'
import Header from '@/components/Header/Header'
const  RootLayout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default RootLayout