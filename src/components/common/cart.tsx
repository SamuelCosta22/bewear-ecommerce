"use client";

import {
  Loader2,
  ShoppingBasketIcon,
  ShoppingCart,
  TicketCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useCart();

  const sortAddItens = cart?.items.sort((a, b) => {
    if (a.createdAt > b.createdAt) return 1;
    if (a.createdAt < b.createdAt) return -1;
    return 0;
  });

  const isEmpty = !cartIsLoading && (!cart?.items || cart.items.length === 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[75%]">
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-3 pb-5">
          {cartIsLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <Image
                src="/empty-cart.svg"
                alt="Carrinho vazio"
                width={200}
                height={200}
              />
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium">Carrinho vazio</h3>
                <p className="text-muted-foreground text-sm">
                  Adicione produtos ao carrinho para continuar
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2 flex h-full max-h-full flex-col overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <div className="flex h-full flex-col gap-6">
                    {sortAddItens?.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productName={item.productVariant.product.name}
                        productVariantId={item.productVariant.id}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col gap-2">
                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Total</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Button className="mt-5 gap-2" asChild>
                  <Link href="/cart/identification">
                    <TicketCheck />
                    Finalizar compra
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// SERVER ACTION
