"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { toast } from "sonner";
import z from "zod";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { removeProductFromCartSchema } from "./schema";

export const removeProductFromCart = async (
  data: z.infer<typeof removeProductFromCartSchema>,
) => {
  removeProductFromCartSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    toast.error("Não autorizado ⚠️");
    throw new Error("Unauthorized");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  if (!cartItem) {
    toast.error("Item não encontrado :(");
    throw new Error("Cart item not found");
  }

  const cartDoesNotBelongToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesNotBelongToUser) {
    toast.error("Não autorizado ⚠️");
    throw new Error("Unauthorized");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
