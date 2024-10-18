import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import React from "react";

export default function TablesTest() {
  return (
    <div className="flex h-screen items-center justify-center bg-green-200">
      <div className="container flex h-full flex-col gap-2 bg-blue-200">
        <header className="flex items-center justify-between bg-red-200">
          <span className="">TITLE HERE</span>
          <Avatar>
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
        </header>
        <main className="overflow-scroll bg-yellow-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>AAA</TableHead>
                <TableHead>AAA</TableHead>
                <TableHead>CCC</TableHead>
                <TableHead>DDD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>

              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
              <TableRow className="h-24">
                <TableCell>AAAAAAAAAA</TableCell>
                <TableCell>BBBBBBBBBB</TableCell>
                <TableCell>CCCCCCCCCC</TableCell>
                <TableCell>DDDDDDDDDD</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  );
}
