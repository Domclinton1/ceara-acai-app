import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../cart";

const CartSheet = () => {
  const { isOpen, toggleCart } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetHeader>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ola</SheetTitle>
            <SheetDescription>This action cannot benundone</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </SheetHeader>
    </Sheet>
  );
};

export default CartSheet;
