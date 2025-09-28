"use client"
import { CategoryDropdown } from "./category-dropdown"
import { CustomCategory } from "../types"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ListFilterIcon } from "lucide-react"
import CategoriesSidebar from "./categories-sidebar"

interface CategoriesProps {
    data: CustomCategory[]
}

export default function Categories({data}:CategoriesProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLDivElement>(null)
    const viewAllRef = useRef<HTMLDivElement>(null)

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const activeCategory = "all";
    const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    useEffect(() => {
        const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children);

            let totalWidth = 0;
            let visible = 0;
            const GAP = 12; 

            for (const item of items) {
                const width = item.getBoundingClientRect().width;

               if (totalWidth + width + (visible > 0 ? GAP : 0) > availableWidth) break;
                totalWidth += width + (visible > 0 ? GAP : 0);
                visible++;
            }

            setVisibleCount(visible);
        };

        const resizeObserver = new ResizeObserver(calculateVisible)
        resizeObserver.observe(containerRef.current!);

        return () => resizeObserver.disconnect()
    }, [data.length]);


  return (
    <div className="relative w-full">
        <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
   {/*Hidden div to measure all items ahead of i=time */}
     <div
     className="absolute opacity-0 pointer-events-none flex"
     style={{position: "fixed", top: -9999, left: -9999}}
     ref={measureRef}>
        {data.map((category) => (
            <div key={category.id}>
                <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={false}
                />
            </div>
        ))}
        </div>

              {/* Visible */}
        <div 
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap gap-3 items-center">
        {data.slice(0, visibleCount).map((category) => (
            <div key={category.id}>
                <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={isAnyHovered}
                />
            </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
            <Button
            onClick={() => setIsSidebarOpen(true)}
             className={cn("h-11 px-4 hover:bg-white hover:border-primary text-black",
            isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary")}>
                View All
                <ListFilterIcon className="ml-2" />
            </Button>
        </div>
        </div>
    </div>
  )
}
