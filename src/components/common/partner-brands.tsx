"use client";

import PartnerBrandItem from "./partner-brand-item";

const PartnerBrands = () => {
  return (
    <div className="space-y-4 bg-white">
      <h3 className="px-5 font-semibold text-black">Marcas parceiras</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <PartnerBrandItem imageUrl="/nike.svg" name="Nike" />
        <PartnerBrandItem imageUrl="/adidas.svg" name="Adidas" />
        <PartnerBrandItem imageUrl="/puma.svg" name="Puma" />
        <PartnerBrandItem imageUrl="/newbalance.svg" name="New Balance" />
      </div>
    </div>
  );
};

export default PartnerBrands;
