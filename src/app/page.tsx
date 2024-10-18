import { UserButton } from "@clerk/nextjs";
import { api, HydrateClient } from "~/trpc/server";
import Head from "next/head";

import { DataTable } from "./data-table";
import ImgDialog from "./img-dialog";

export default async function Home() {
  void api.employee.getEmployees.prefetch();
  return (
    <HydrateClient>
      <div className="flex h-screen justify-center bg-background">
        <div className="container h-full px-2">
          <header className="flex flex-row items-center justify-between py-2">
            <h1 className="text-xl font-bold">Bogo Glass ID System</h1>
            <HeaderIcons />
          </header>
          <main className="">
            <ImgDialog />
            <DataTable />
          </main>
        </div>
      </div>
    </HydrateClient>
  );
}

const HeaderIcons = async () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", // Custom width and height
      userButtonOuterIdentifier: "text-xl",
    },
  };
  return <UserButton appearance={userButtonAppearance} />;
};
