"use client";
import { Input } from "~/components/ui/input";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { type EmployeeType } from "~/server/db/schema";

type CustomUploadButtonProps = {
  uploadFor: "picture" | "signature";
  rowData: EmployeeType;
};

export default function CustomUploadButton(props: CustomUploadButtonProps) {
  const rowData = props.rowData;
  const uploadFor = props.uploadFor;

  const utils = api.useUtils();

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
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
        rowData.fullName.replace(",", "").replace(".", "").split(" ").join(""),
        {
          type: oldFile.type,
          lastModified: oldFile.lastModified,
        },
      );
      console.log(newFile, rowData);
      await startUpload([newFile], {
        ...rowData,
        uploadFor: uploadFor,
      });
    }
  };

  return (
    <label
      className="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      htmlFor={`${rowData.id}`}
    >
      <span>
        Upload {uploadFor === "picture" ? "Picture" : "Signature"} for{" "}
        {rowData.fullName}
      </span>
      <Input
        type="file"
        capture="environment"
        className="hidden"
        id={`${rowData.id}`}
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => console.log(rowData.fullName)}
      />
    </label>
  );
}
