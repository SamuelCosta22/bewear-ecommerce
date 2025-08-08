import { Loader2, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-product-quantity";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-product-quantity";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const {
    mutate: removeProductFromCartMutation,
    isPending: isRemovingProductFromCartPending,
  } = useRemoveProductFromCart(id);

  const {
    mutate: decreaseCartProductQuantityMutation,
    isPending: isDecreasingCartProductQuantityPending,
  } = useDecreaseCartProduct(id);

  const {
    mutate: increaseCartProductQuantityMutation,
    isPending: isIncreasingCartProductQuantityPending,
  } = useIncreaseCartProduct(productVariantId);

  const handleRemoveProductFromCart = () => {
    removeProductFromCartMutation(undefined, {
      onSuccess: () => {
        toast.success("Item removido com sucesso ✅");
      },
      onError: () => {
        toast.error("Erro ao remover item ❌");
      },
    });
  };

  const handleDecreaseCartProductQuantity = () => {
    decreaseCartProductQuantityMutation(undefined, {
      onSuccess: (data) => {
        if (data?.wasLastItem) {
          toast.success("Item removido com sucesso ✅");
        }
      },
    });
  };

  const handleIncreaseCartProductQuantity = () => {
    increaseCartProductQuantityMutation(undefined, {});
  };

  const isLoading =
    isRemovingProductFromCartPending ||
    isDecreasingCartProductQuantityPending ||
    isIncreasingCartProductQuantityPending;

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        isLoading && "opacity-40",
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="max-w-[120px] truncate text-sm font-medium">
            {productName}
          </p>
          <p className="text-muted-foreground text-xs">{productVariantName}</p>
          <div className="flex w-[80px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecreaseCartProductQuantity}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleIncreaseCartProductQuantity}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-6">
        <Button
          variant="outline"
          className="h-6 w-6"
          onClick={handleRemoveProductFromCart}
          disabled={isRemovingProductFromCartPending}
        >
          {isRemovingProductFromCartPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <p className="text-xs font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
