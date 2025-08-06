import Image from "next/image";

interface PartnerBrandItemProps {
  imageUrl: string;
  name: string;
}

const PartnerBrandItem = ({ imageUrl, name }: PartnerBrandItemProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-[80px] w-[80px] items-center justify-center rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
        <Image
          src={imageUrl}
          alt={name}
          width={70}
          height={70}
          className="rounded-3xl object-contain"
        />
      </div>
      <p className="max-w-[80px] truncate text-center text-xs font-medium text-muted-foreground">
        {name}
      </p>
    </div>
  );
};

export default PartnerBrandItem;
