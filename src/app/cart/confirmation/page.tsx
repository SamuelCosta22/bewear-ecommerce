import { TicketCheck } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AddressDisplay } from "@/components/common/address-display";
import Footer from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <>
      <div className="space-y-4 p-5">
        <Card>
          <CardHeader>
            <CardTitle className="font-medium">Endereço de entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-3">
            <Card>
              <CardContent>
                <AddressDisplay address={cart.shippingAddress} />
              </CardContent>
            </Card>
            <Button className="w-full gap-2" size="lg">
              <TicketCheck />
              Finalizar compra
            </Button>
          </CardContent>
        </Card>
        <CartSummary
          subTotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variant: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationPage;
