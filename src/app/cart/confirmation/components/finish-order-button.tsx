"use client";

import { Loader2, ScrollText, Store, TicketCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);
  const finishOrderMutation = useFinishOrder();
  const handleFinishOrder = () => {
    finishOrderMutation.mutate();
    setSuccessDialogIsOpen(true);
  };

  return (
    <>
      <Button
        className="w-full"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        <TicketCheck />
        Finalizar compra
      </Button>
      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={240}
            height={240}
            className="mx-auto"
          />
          <div className="space-y-2">
            <DialogTitle className="mt-2 text-xl">Pedido efetuado!</DialogTitle>
            <DialogDescription className="text-sm">
              Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
              na seção de “Meus Pedidos”.
            </DialogDescription>
          </div>

          <DialogFooter>
            <Button size="lg" className="gap-2 font-medium">
              <ScrollText />
              Ver meus pedidos
            </Button>
            <Button variant="outline" size="lg" className="font-medium" asChild>
              <Link href="/">
                <Store />
                Voltar para a loja
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
