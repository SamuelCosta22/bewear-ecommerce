"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { USE_CART_QUERY_KEY } from "@/hooks/queries/use-cart";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_CART_QUERY_KEY] });
      toast.success("Produto adicionado ao carrinho");
    },
  });

  return (
    <Button
      className="gap-2"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <ShoppingCartIcon className="size-4" />
          Adicionar ao carrinho
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
