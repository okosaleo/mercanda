import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";

interface Props {
    isPurchased?: boolean;
    tenantSlug: string;
    productId: string;
}

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
    const cart = useCart(tenantSlug);

    if (isPurchased) {
        return (
            <Button asChild
              className="flex-1 font-medium "
                 >
            <Link prefetch href={`/library/${productId}`}>
                View in Library
             </Link>
            </Button>
        )
    }
    return (
        <Button
         className={cn("flex-1", cart.isProductInCart(productId) && "bg-red-500 text-white" )}
         onClick={() => cart.toggleProduct(productId)}
         >
          {cart.isProductInCart(productId) ? "Remove from Cart" : "Add to Cart"}
        </Button>
    )
}