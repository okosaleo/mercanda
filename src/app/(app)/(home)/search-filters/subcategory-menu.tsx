import Link from "next/link";
import { CustomCategory } from "../types";


interface SubcategoryMenuProps {
    category: CustomCategory;
    isOpen: boolean;
    position: {top: number; left: number}
}
export default function SubcategoryMenu({
    category,
    isOpen,
    position,
}:SubcategoryMenuProps) {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0 ) {
        return null
    }

    const backgroundColor = category.color || "#f5f5f5";


  return (
    <div 
    className="fixed z-100"
    style={{
        top: position.top,
        left: position.left
    }}
    >
        <div className="h-3 w-60" />
        <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]">
            <div>
                {category.subcategories?.map((subcategory) => (
                    <Link 
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
                    href={`/${category.slug}/${subcategory.slug}`}
                     key={subcategory.slug}>
                        {subcategory.name}
                    </Link>
                ) )}
            </div>
        </div>
    </div>
  )
}
