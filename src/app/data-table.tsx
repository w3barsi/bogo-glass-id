"use client";

import { type EmployeeType } from "~/server/db/schema";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import CustomUploadButton from "./custom-upload-button";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function DataTable(props: { initialData: EmployeeType[] }) {
  const { data } = api.employee.getEmployees.useQuery(undefined, {
    initialData: props.initialData,
  });
  const [globalFilter, setGlobalFilters] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Search all columns"
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilters(String(event.target.value))}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Picture</TableHead>
              <TableHead>Signature</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              return <ARow key={row.id} rowData={row} />;
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ARow({ rowData }: { rowData: EmployeeType }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{rowData.fullName}</TableCell>
      <TableCell>
        <div className="flex flex-row">
          {rowData.pic ? (
            <Avatar>
              <AvatarImage src={rowData.pic} />
              <AvatarFallback>DG</AvatarFallback>
            </Avatar>
          ) : (
            ""
          )}
          <CustomUploadButton uploadFor="picture" rowData={rowData} />
        </div>
      </TableCell>
      <TableCell>
        <CustomUploadButton uploadFor="signature" rowData={rowData} />
      </TableCell>
    </TableRow>
  );
}

function Why(props: { rowData: EmployeeType }) {
  const rowData = props.rowData;

  return (
    <label
      className="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      htmlFor="pic"
    >
      <span>{rowData.fullName}</span>
      <Input
        type="file"
        capture="environment"
        className="hidden"
        id="pic"
        accept="image/*"
      />
    </label>
  );
}
