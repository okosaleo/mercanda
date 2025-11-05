import NavBarCheckout from "@/modules/checkout/ui/components/navbar";
import FooterTenants from "@/modules/tenants/ui/components/footer";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{slug: string}>
}

export default async function Layout({children, params}: LayoutProps) {
  const { slug } = await params;
  
   
          
  return (
    <div className=" min-h-screen flex flex-col">
     <NavBarCheckout slug={slug} />
     <div className="flex-1">
        <div className="max-w-(--breakppoint-xl) mx-auto">
            {children}
        </div>
     </div>
      <FooterTenants />
    </div>
  );
}
