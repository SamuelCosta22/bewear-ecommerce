import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: removeProductFromCartMutation, isPending } = useMutation({
    mutationKey: ["remove-product-from-cart"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

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

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        isPending && "opacity-40",
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
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
              <MinusIcon />
            </Button>
            <p className="text-xs">{quantity}</p>
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
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
          disabled={isPending}
        >
          {isPending ? (
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
