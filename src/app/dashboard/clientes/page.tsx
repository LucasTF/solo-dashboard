import { DataTable, TableRow } from "@/components/DataTable/DataTable";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";

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
  ];

  const columnNames = ["Id", "Nome", "Email", "Telefone"];

  return (
    <main>
      <h1 className="font-bold text-4xl w-4/5 mx-auto my-4 text-white">
        Clientes
      </h1>
      <section className="p-8 bg-slate-200 w-4/5 mx-auto rounded-md shadow-lg">
        <SearchBar />

        <p className="my-4 font-bold">
          {clients.length} resultado(s) encontrados.
        </p>

        <div className="overflow-x-auto">
          <DataTable columns={columnNames}>
            {clients.map((client, index) => (
              <TableRow key={index} content={client} />
            ))}
          </DataTable>
        </div>

        <Pagination />

        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="bg-green-700 hover:bg-green-600 font-semibold text-white p-4 rounded-md"
          >
            + Novo Cliente
          </button>
        </div>
      </section>
    </main>
  );
}
