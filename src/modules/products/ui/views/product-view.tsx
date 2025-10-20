"use client";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
// import CartButton from "../components/cart-button";
import dynamic from "next/dynamic";

const CartButton = dynamic(() => import("../components/cart-button").then((mod) => mod.CartButton,
   ),
    { ssr: false }
);

interface ProductViewProps {
    productId: string;
    tenantSlug: string;
};

export default function ProductView({productId, tenantSlug}: ProductViewProps) {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ 
        id: productId
    }))
   
  return (
    <div className="px-4 lg:px-12 py-10">
        <div className="border rounded-sm bg-white overflow-hidden">
            <div className="relative aspect-[3.9] border-b">
                <Image 
                src={data.image?.url || "/noimg.png"}
                alt={data.name}
                fill 
                className="object-cover"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6">
                <div className="col-span-4">
                    <div className="p-6">
                        <h1 className="text-4xl font-medium">{data.name}</h1>
                    </div>
                    <div className="border-y flex">
                        <div className="px-6 py-4 flex items-center justify-center border-r">
                            <div className=" px-2 py-1 border bg-[#A985FF]/70 w-fit">
                                <p className="text-base font-medium">{
                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                        }).format(Number(data.price))}</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                            <Link 
                            href={generateTenantURL(tenantSlug)}
                            className="flex items-center gap-2"
                            >
                                {data.tenant.image?.url && (
                                    <Image 
                                    src={data.tenant.image.url} 
                                    alt={data.tenant.name}
                                    width={20}
                                    height={20}
                                    className="rounded-full border shrink-0 size-[20px]"
                                    />
                                )}
                                <p className="text-base underline font-medium">{data.tenant.name}</p>
                            </Link>
                        </div>
                        <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                            <div className="flex items-center gap-1">
                                <StarRating 
                                rating={4}
                                iconClassName="size-4"
                                 />
                            </div>
                        </div>
                    </div>

                    <div className="block lg:hidden px-6 py-4 items-center justify-center border-t">
                        <div className="flex items-center gap-1">
                             <StarRating 
                                rating={4}
                                iconClassName="size-4"
                                 />
                            <p className="text-base font-medium">{5} ratings</p>
                        </div>
                    </div>

                    <div className="p-6">
                        {data.description ? (
                            <p>{data.description}</p>
                        ) : (
                            <p className="font-medium text-muted-foreground">No description provided</p>
                        )}
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="border-t lg:border-t-0 lg:border-l h-full">
                        <div className="flex flex-col gap-4 p-6 border-b">
                            <div className="flex flex-row items-center gap-2">
                                <CartButton 
                                productId={productId}
                                tenantSlug={tenantSlug}
                                 />
                                <Button 
                                onClick={() => {}}
                                className="size-12 bg-white">
                                    <LinkIcon />
                                </Button>
                            </div>
                            <p className="text-center font-medium">
                                {data.refundPolicy === "no-refunds"
                                ? "No refunds" 
                                : `${data.refundPolicy} money back guarantee`
                                }
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium">
                                    Ratings
                                </h3>
                                <div className="flex items-center gap-x-1 font-medium">
                                    <StarIcon className="size-4 fill-black" />
                                    <p>({4.0})</p>
                                    <p className="text-sm">{5} ratings</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                                {[5,4,3,2,1].map((stars) => (
                                    <Fragment key={stars}>
                                        <div className="font-medium">
                                            {stars} {stars === 1 ? "star" : "stars"}
                                        </div>
                                        <Progress
                                        value={0}
                                        className="h-[1lh]"
                                         />
                                         <div className="font-medium">
                                            {0}%
                                         </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
