import { Button } from "@/components/ui/button";
import { useCurrencyFormatter } from "../../hooks/formatcurrency";
import { CircleXIcon } from "lucide-react";

interface CheckoutSidebarProps {
    total: number ;
    isPending: boolean;
    isCanceled: boolean;
    onPurchase: () => void;
}

export default function CheckoutSidebar({ 
    total, 
    isPending, 
    isCanceled, 
    onPurchase }: CheckoutSidebarProps) {
        const formatCurrency = useCurrencyFormatter();
    return (
        <div className="border rounded-md bg-white p-6 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-medium text-lg">
                    Total
                </h4>
                <p className="font-medium text-lg">{formatCurrency(total)} </p>
            </div>

            <div className="p-4 flex items-center justify-center">
                <Button
                onClick={onPurchase}
                disabled={isPending}
                size="lg"
                className="text-base w-full "
                >
                    Checkout
                </Button>
            </div>
            {
                isCanceled && (
                    <div className="p-4 justify-center flex items-center border-t ">
                        <div className="bg-red-100 border-red-400 font-medium px-4 py-3 rounded-md flex items-center">
                            <div className="flex items-center">
                                <CircleXIcon className="size-5 mr-2 fill-red-500 text-red-100" />
                                <span>
                                    Checkout failed. Please try again.
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        )
}