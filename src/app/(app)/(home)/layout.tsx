
import React from 'react'
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1'>
        {children}
        </div>
        <Footer />
    </div>
  )
}
