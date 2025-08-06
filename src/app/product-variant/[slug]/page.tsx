import { eq } from "drizzle-orm";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <div className="mb-8 flex flex-col space-y-4">
        <div className="px-5">
          <div className="relative h-[380px] w-full rounded-3xl">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </div>

        <div className="px-5">
          <VariantSelector
            variants={productVariant.product.variants}
            selectedVariant={productVariant.slug}
          />
        </div>

        <div className="space-y-1 px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5"></div>

        <div className="flex flex-col space-y-2 px-5">
          <Button size="lg" variant="outline" className="gap-2">
            <ShoppingCartIcon className="size-4" />
            Adicionar ao carrinho
          </Button>
          <Button size="lg" className="gap-2">
            <ShoppingBagIcon className="size-4" />
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-muted-foreground text-sm">
            {productVariant.product.description}
          </p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />
      </div>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
