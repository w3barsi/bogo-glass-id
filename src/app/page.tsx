import { api } from "~/trpc/server";
import { UserButton } from "@clerk/nextjs";
import { DataTable } from "./data-table";

export default async function Home() {
  const data = await api.employee.getEmployees();
  return (
    <div className="flex h-screen justify-center bg-background">
      <div className="container h-full px-2">
        <header className="flex flex-row items-center justify-between py-2">
          <h1 className="text-xl font-bold">Borbon ID System</h1>
          <HeaderIcons />
        </header>
        <main>
          <DataTable initialData={data} />
        </main>
      </div>
    </div>
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
