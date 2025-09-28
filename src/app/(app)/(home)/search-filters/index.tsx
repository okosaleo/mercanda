"use client"
import { useTRPC } from "@/trpc/client";
import { CustomCategory } from "../types";
import Categories from "./categories";
import SearchInput from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";


export default function SearchFilters() {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions())
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
        <SearchInput data={data} />
        <div className="hidden lg:block ">
        <Categories data={data} />
        </div>
    </div>
  )
}


export const SearchFiltersLoading = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b fles fles-col gap-4 w-full" style={{
      backgroundColor: "#f5f5f5",
    }}>
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-10" />
      </div>
    </div>
  )
}
