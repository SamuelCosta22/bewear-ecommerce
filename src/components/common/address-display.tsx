"use client";

interface Address {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressDisplayProps {
  address: Address;
  variant?: "default" | "compact" | "card";
}

export const AddressDisplay = ({
  address,
  variant = "default",
}: AddressDisplayProps) => {
  if (variant === "compact") {
    return (
      <div className="text-sm">
        <span className="font-medium text-gray-900">
          {address.recipientName}
        </span>
        <span className="text-gray-500"> • </span>
        <span className="text-gray-700">
          {address.street}, {address.number} - {address.neighborhood},{" "}
          {address.city}/{address.state}
        </span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="space-y-2 rounded-lg border bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-2 w-2 rounded-full"></div>
          <h4 className="font-semibold text-gray-900">
            {address.recipientName}
          </h4>
        </div>
        <div className="space-y-1 pl-4 text-sm">
          <p className="text-gray-700">
            {address.street}, {address.number}
            {address.complement && (
              <span className="text-gray-500"> - {address.complement}</span>
            )}
          </p>
          <p className="text-gray-600">
            {address.neighborhood}, {address.city} - {address.state}
          </p>
          <p className="inline-block rounded bg-white px-2 py-1 font-mono text-xs text-gray-500">
            CEP: {address.zipCode}
          </p>
        </div>
      </div>
    );
  }

  // variant === "default"
  return (
    <div className="space-y-1 text-xs">
      <p className="text-primary font-semibold">{address.recipientName}</p>
      <p className="text-gray-700">
        {address.street}, {address.number}
        {address.complement && (
          <span className="text-gray-500"> - {address.complement}</span>
        )}
      </p>
      <p className="text-gray-600">{address.neighborhood}</p>
      <p className="text-gray-600">
        {address.city} - {address.state}
      </p>
      <p className="text-gray-500">CEP: {address.zipCode}</p>
    </div>
  );
};
