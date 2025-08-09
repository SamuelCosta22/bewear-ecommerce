import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subTotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variant: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subTotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">Resumo do carrinho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <p className="text-xs">Subtotal</p>
            <p className="text-muted-foreground text-xs font-medium">
              {formatCentsToBRL(subTotalInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs">Frete</p>
            <p className="text-muted-foreground text-xs font-medium">GRÁTIS</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs">Total</p>
            <p className="text-muted-foreground text-xs font-medium">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>

          <div className="py-3">
            <Separator />
          </div>

          {products.map((product) => (
            <div className="flex items-center justify-between" key={product.id}>
              <div className="flex items-center gap-3">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-1">
                  <p className="max-w-[120px] truncate text-sm font-medium">
                    {product.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {product.variant}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center gap-6">
                <p className="text-xs font-bold">
                  {formatCentsToBRL(product.priceInCents)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default CartSummary;
