import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";

interface Props {
    tenantSlug: string;
    productId: string;
}

export default function CartButton({ tenantSlug, productId }: Props) {
    const cart = useCart(tenantSlug);
    return (
        <Button
         className={cn("flex-1", cart.isProductInCart(productId) && "bg-red-500 text-white" )}
         onClick={() => cart.toggleProduct(productId)}
         >
          {cart.isProductInCart(productId) ? "Remove from Cart" : "Add to Cart"}
        </Button>
    )
}