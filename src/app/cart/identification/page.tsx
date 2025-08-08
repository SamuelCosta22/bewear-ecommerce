import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Addresses from "./components/addresses";

const CartIdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: true,
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="px-5">
        <Addresses shippingAddresses={[]} defaultShippingAddressId={null} />
      </div>
    </div>
  );
};

export default CartIdentificationPage;
