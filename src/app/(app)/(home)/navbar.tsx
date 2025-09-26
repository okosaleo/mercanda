"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import NavbarSideBar from './navnbae-sidebar'
import { MenuIcon } from 'lucide-react'

interface NavbarProps {
    href: string;
    children: React.ReactNode
    isActive: boolean;
}

const NavbarItem = ({
    href,
    children,
    isActive,
}: NavbarProps) => {
    return (
        <Button className={cn("px-3.5", isActive && "bg-black border-main text-white  hover:bg-black hover:text-white")} asChild>
            <Link href={href}>
               {children}
            </Link>
        </Button>
    )
}

const navbarItems = [
    {href: "/", children: "Home"},
    {href: "/about", children: "About"},
    {href: "/features", children: "Features"},
    {href: "/pricing", children: "Pricing"},
    {href: "/contact", children: "Contact"},
];

export default function Navbar() {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className='h-20 flex border-b justify-between font-medium'>
       <Link href="/" className='pl-6 flex items-center' >
       <span className={cn("md:text-5xl text-4xl  font-semibold")}>Mercanda</span>
       </Link>

       <NavbarSideBar
       open={isSidebarOpen}
       onOpenChange={setIsSidebarOpen}
       items={navbarItems}
        />

       <div className='items-center gap-4 hidden lg:flex pr-4'>
         {navbarItems.map((item) => (
            <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
            >
                {item.children}
            </NavbarItem>
         ))}
       </div>
       <div className='hidden lg:flex'>
        <Link href="sign-in" className='border-l border-t-0 border-b-0 border-r bg-main hover:bg-main/20 p-10 h-full flex items-center justify-center rounded-none transition-colors text-lg '>
            Log in
        </Link>
        <Link href="sign-up" className='border-l border-t-0 border-b-0 border-r border-black bg-black text-white hover:bg-main/20 hover:text-black p-6 h-full rounded-none transition-colors text-lg '>
            Start selling
        </Link>
       </div>

       <div className='flex lg:hidden items-center justify-center p-4'>
        <Button className='' onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
        </Button>
       </div>
    </div>
  )
}
