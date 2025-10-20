import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function FooterTenants() {
  return (
    <footer className=' border-t font-medium bg-white '>
        <div className='max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 py-6 lg:px-12'>
         <p className='text-xl'>Powered by</p>
         <Link href="/">
         <span className={cn("text-2xl font-semibold ")}> Mercanda</span>
         </Link>
        </div>
    </footer>
  )
}
