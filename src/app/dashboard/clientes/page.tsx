import DataOptions from "@/components/DataOptions/DataOptions";
import { DataTable } from "@/components/DataTable/DataTable";
import SearchBar from "@/components/SearchBar/SearchBar";

import { FunnelIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const clients = [
    {
      id: 1,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 2,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 3,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 4,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 5,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 6,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 7,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 8,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 9,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 10,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 11,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
  ];

  const columnNames = ["Id", "Nome", "Email", "Telefone"];

  return (
    <main className="my-8">
      <h1 className="font-bold text-4xl w-11/12 lg:w-4/5 mx-auto mb-8 text-white">
        Clientes
      </h1>

      <section className="p-8 bg-slate-200 w-11/12 lg:w-4/5 mx-auto rounded-md shadow-lg">
        <header className="flex gap-4">
          <SearchBar />

          <button
            type="button"
            className="py-2 px-4 rounded-md shadow-md ease-in-out duration-300 hover:bg-sky-800 hover:text-white"
          >
            <FunnelIcon className="h-6 w-6" />
          </button>
        </header>

        <DataTable columns={columnNames} content={clients} />

        <DataOptions />
      </section>
    </main>
  );
}
