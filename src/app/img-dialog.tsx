"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { useImgDialogStore } from "./store";
import Image from "next/image";

export default function ImgDialog() {
  const { isOpen, setIsOpen, link } = useImgDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="h-[90%] max-w-[90%]">
        <img
          src={link}
          alt="BIG IMAGE"
          className="absolute h-full w-full rounded-sm object-contain object-center sm:rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
}
