"use client";
import { Input } from "~/components/ui/input";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { type EmployeeType } from "~/server/db/schema";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { EmployeeOnlyType } from "./types";

type CustomUploadButtonProps = {
  uploadFor: "picture" | "signature";
  rowData: EmployeeOnlyType;
  children: ReactNode;
};

export default function CustomUploadButton(props: CustomUploadButtonProps) {
  const rowData = props.rowData;
  const uploadFor = props.uploadFor;

  const utils = api.useUtils();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async () => {
      toast.success(
        `${props.uploadFor === "picture" ? "Picture" : "Signature"} uploaded for ${rowData.fullName}`,
      );
      await utils.employee.getEmployees.invalidate();
    },
    onUploadError: () => {
      toast.error("Something went wrong with the upload.");
    },
    onUploadBegin: () => {
      toast(`Uploading for ${rowData.fullName}`);
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Check if a file is selected
    if (event.target.files && event.target.files.length > 1) {
      toast.error("Please only upload 1 file");
      return;
    }

    if (event.target.files && event.target.files.length === 1) {
      const oldFile = event.target.files[0];
      if (!oldFile) return toast.error("Error handling file");
      const newFile = new File(
        [oldFile],
        `${rowData.fullName.replace(",", "").replace(".", "").split(" ").join("")}.jpg`,
        {
          type: oldFile.type,
          lastModified: oldFile.lastModified,
        },
      );
      // console.log(newFile, rowData);
      console.log(uploadFor);
      await startUpload([newFile], {
        ...rowData,
        uploadFor: uploadFor,
      });
    }
  };

  return (
    <label htmlFor={`${rowData.id}_${uploadFor}`} className="cursor-pointer">
      <span>{props.children ? props.children : "Take Picture"}</span>
      <Input
        type="file"
        capture="environment"
        className="hidden"
        id={`${rowData.id}_${uploadFor}`}
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => console.log(rowData)}
      />
    </label>
  );
}
