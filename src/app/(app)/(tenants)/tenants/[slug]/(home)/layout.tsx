import FooterTenants from "@/modules/tenants/ui/components/footer";
import NavBarTenants, { NavBarTenantsSkeleton } from "@/modules/tenants/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{slug: string}>
}

export default async function Layout({children, params}: LayoutProps) {
  const { slug } = await params;
  
   const queryClient = getQueryClient();
      void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug,
      }))
          
  return (
    <div className=" min-h-screen flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavBarTenantsSkeleton />}>
           <NavBarTenants slug={slug} />
        </Suspense>
        </HydrationBoundary>
        <div className="flex-1 ">
            <div className="max-w-(--breakpoint-xl) mx-auto">
             {children}
             </div>
             
        </div>
        <FooterTenants />
    </div>
  );
}
