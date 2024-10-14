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
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  type ColumnDef,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { type RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { EmployeeOnlyType } from "./types";
import PictureCell from "./picture-cell";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const columns: ColumnDef<EmployeeType>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "fullName",
    cell: ({ row }) => {
      return <div className="w-full">{row.getValue("fullName")}</div>;
    },
  },
  {
    accessorKey: "pic",
    cell: ({ row }) => {
      const rowData: EmployeeOnlyType = {
        fullName: row.getValue("fullName"),
        pic: row.getValue("pic"),
        sig: row.getValue("sig"),
        id: row.getValue("id"),
      };

      return <PictureCell rowData={rowData} uploadFor="picture" />;
    },
  },
  {
    accessorKey: "sig",
    cell: ({ row }) => {
      const rowData: EmployeeOnlyType = {
        fullName: row.getValue("fullName"),
        pic: row.getValue("pic"),
        sig: row.getValue("sig"),
        id: row.getValue("id"),
      };

      return <PictureCell rowData={rowData} uploadFor="signature" />;
    },
  },
];

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function DataTable() {
  const [data] = api.employee.getEmployees.useSuspenseQuery();
  const [globalFilter, setGlobalFilter] = useState("");
  const [hasPic, setHasPic] = useState(0);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "fuzzy",
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter,
    },
  });

  useEffect(() => {
    setHasPic(data.filter((e) => e.pic !== null).length);
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-center">
        <Input onChange={(e) => setGlobalFilter(e.target.value)} />
        <span className="text-nowrap">
          {hasPic}/{data.length}
        </span>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-full w-5">ID</TableHead>
              <TableHead className="h-full min-w-64">Full Name</TableHead>
              <TableHead className="w-12 min-w-36 text-center">
                Picture
              </TableHead>
              <TableHead className="w-12 min-w-36 text-center">
                Signature
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
