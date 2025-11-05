import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug: string;
    tenantImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
};

export default function ProductCard({
    id,
    imageUrl,
    tenantSlug,
    tenantImageUrl,
    reviewRating,
    name,
    reviewCount,
}: ProductCardProps) {
  return (
    <Link href={`/library/${id}`}>
        <div className='hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col'>
            <div className='relative aspect-square'>
                <Image
                alt={name}
                fill
                className="object-cover"
                src={imageUrl || "/noimg.png"}
                />
            </div>
            <div className='p-4 border-y flex flex-col gap-3 flex-1'>
                <h2 className='text-lg font-medium line-clamp-4'>{name}</h2>
                <div className='flex items-center gap-2'>
                {tenantImageUrl && (
                    <Image 
                    alt={tenantSlug}
                    src={tenantImageUrl}
                    width={16}
                    height={16}
                    className="rounded-full border shrink-0 size-[16px]"
                    />
                )} 

                <p className='text-sm underline font-medium'>{tenantSlug}</p>
            </div>
            {reviewCount > 0 && (
                <div className='flex items-center gap-1 '>
                    <StarIcon className='size-3.5 fill-black'/>
                    <p className='text-sm font-medium'>
                        {reviewRating} ({reviewCount})
                    </p>
             </div>
            )}
            </div>
        </div>
    </Link>
  )
}




export function ProductCardSkeleton() {
  return (
    <div className='hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col'>
      {/* Image placeholder */}
      <div className='relative aspect-square'>
        
      </div>

      {/* Content */}
      <div className='p-4 border-y flex flex-col gap-3 flex-1'>
        {/* Title */}
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-5 w-1/2' />

        {/* Author */}
        <div className='flex items-center gap-2'>
          <Skeleton className='size-4 rounded-full' />
          <Skeleton className='h-4 w-24' />
        </div>

        {/* Rating */}
        <div className='flex items-center gap-1'>
          <Skeleton className='h-3.5 w-20' />
        </div>
      </div>

      {/* Price */}
      <div className='p-4'>
        <Skeleton className='h-5 w-16' />
      </div>
    </div>
  )
}
