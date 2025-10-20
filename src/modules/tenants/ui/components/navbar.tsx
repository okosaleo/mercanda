"use client";
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Import ShadCN Skeleton
import Link from 'next/link';
import Image from 'next/image';
import { generateTenantURL } from '@/lib/utils';

interface Props {
  slug: string;
}

export default function NavBarTenants({ slug }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({ slug })
  );

  return (
    <nav className='h-20 border-b font-medium bg-white'>
      <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
        <Link href={generateTenantURL(slug)} className="flex items-center gap-2">
        {data.image?.url && (
          <Image src={data.image.url}
          width={32}
          height={32}
          alt={slug}
          className="rounded-full border shrink-0 object-cover"
           />
        )}
            <p className='text-xl'>{data.name}</p>
        </Link>
      </div>
    </nav>
  );
}

// ✅ Skeleton Loader
export const NavBarTenantsSkeleton = () => {
  return (
    <nav className='h-20 border-b font-medium bg-white'>
      <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
        {/* Logo / Name skeleton */}
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>
    </nav>
  );
};
