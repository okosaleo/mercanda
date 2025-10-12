interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[]
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import React from 'react'

export default function NavbarSideBar({
    items, 
    open,
    onOpenChange
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className='p-0 transition-none'>
            <SheetHeader className='p-4 border-b'>
                <div className='flex items-center'>
                    <SheetTitle>
                        Menu
                    </SheetTitle>
                </div>
            </SheetHeader>

            <ScrollArea className='flex flex-col overflow-y-auto'>
                {items.map((item) => (
                    <Link
                    onClick={() => onOpenChange(false)} 
                    className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
                    href={item.href}
                    key={item.href}>
                        {item.children}
                    </Link>
                ))}
                <div className='border-t'>
                    <Link href="/sign-in"
                    onClick={() => onOpenChange(false)} 
                     className='w-full text-left p-4 bg-main hover:bg-black hover:text-white
                    flex items-center text-base font-medium'>Log in</Link>
                     <Link 
                     onClick={() => onOpenChange(false)} 
                     href="/sign-up" 
                     className='w-full text-left p-4 bg-black text-white hover:bg-black hover:text-white
                    flex items-center text-base font-medium'>Start sellng</Link>
                </div>
            </ScrollArea>
        </SheetContent>
    </Sheet>
  )
}


