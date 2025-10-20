"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useProductFilters } from '../../hooks/use-products-filters'

export default function ProductSort() {
    const [filters, setFilters] = useProductFilters()
  return (
    <div className='flex items-center gap-2 '>
        <Button 
        size="sm"
        className={cn("text-sm", filters.sort !== "curated" && "bg-white hover:bg-transparent")}
        onClick={() => setFilters({ sort: "curated"})}
        >
            Curated
        </Button>
        <Button 
        size="sm"
        className={cn("text-sm ", filters.sort !== "trending" && "bg-white hover:bg-transparent")}
        onClick={() => setFilters({ sort: "trending"})}
        >
            Trending
        </Button>
        <Button 
        size="sm"
        className={cn("text-sm", filters.sort !== "hot_and_new" && "bg-white hover:bg-transparent")}
        onClick={() => setFilters({ sort: "hot_and_new"})}
        >
            Hot & New
        </Button>
    </div>
  )
}
