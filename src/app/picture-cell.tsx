"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { DialogTitle } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import CustomUploadButton from "./custom-upload-button";
import { useImgDialogStore } from "./store";
import { EmployeeOnlyType } from "./types";

export default function PictureCell(props: {
  rowData: EmployeeOnlyType;
  uploadFor: "signature" | "picture";
}) {
  const rowData = props.rowData;
  const imgLink = props.uploadFor === "picture" ? rowData.pic : rowData.sig;

  const { setIsOpen: setIsDialogOpen } = useImgDialogStore();
  const { setLink } = useImgDialogStore();
  const utils = api.useUtils();

  const [open, setOpen] = useState(false);

  const deletePicture = api.employee.deletePicture.useMutation({
    onError: () => {
      toast.error(`Failed to delete ${rowData.fullName}'s Picture.`);
    },
    onSuccess: async () => {
      toast.success(`Successfully deleted ${rowData.fullName}'s Picture.`);
      await utils.employee.getEmployees.invalidate();
    },
  });

  const deleteSignature = api.employee.deleteSignature.useMutation({
    onError: () => {
      toast.error(`Failed to delete ${rowData.fullName}'s Signature.`);
    },
    onSuccess: async () => {
      toast.success(`Successfully deleted ${rowData.fullName}'s Signature.`);
      await utils.employee.getEmployees.invalidate();
    },
  });

  if (!imgLink) {
    return (
      <Button>
        <CustomUploadButton rowData={rowData} uploadFor={props.uploadFor}>
          Take {props.uploadFor === "signature" ? "Signature" : "Picture"}
        </CustomUploadButton>
      </Button>
    );
  }

  const handleAction = () => {
    if (props.uploadFor === "picture") {
      deletePicture.mutate({ id: rowData.id });
    } else {
      deleteSignature.mutate({ id: rowData.id });
    }

    setOpen(false);
  };

  const handleViewPicture = () => {
    setLink(rowData.pic!);
    setOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div className="relative h-10 w-10 overflow-hidden rounded-full object-cover">
            <Image
              src={imgLink}
              height={0}
              width={80}
              alt={rowData.fullName}
              className="rounded h-full w-full object-cover object-center"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <Button variant="ghost">
            <CustomUploadButton uploadFor="picture" rowData={rowData}>
              Retake Picture
            </CustomUploadButton>
          </Button>
          <Button variant="ghost" onClick={handleViewPicture}>
            View Picture
          </Button>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Picture</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAction}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
