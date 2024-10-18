"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import Image from "next/image";

import { useImgDialogStore } from "./store";

export default function ImgDialog() {
  const { isOpen, setIsOpen, link } = useImgDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" h-[90%] max-w-[90%]">
        <Image
          width={766}
          height={0}
          src={link}
          alt="BIG IMAGE"
          className="absolute h-full w-full rounded-sm object-contain object-center sm:rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
}
