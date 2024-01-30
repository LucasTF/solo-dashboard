"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

import SearchBar from "../SearchBar/SearchBar";
import Table, { Tb } from "../Table";
import DataOptions from "../DataOptions/DataOptions";

const Databoard = () => {
  const clients = [
    {
      id: 1,
      name: "Lucas",
      email: "lucas.htferreira@outlook.com",
      phone: "11941410495",
    },
    {
      id: 2,
      name: "John",
      email: "john.doe@outlook.com",
      phone: "11954540492",
    },
    {
      id: 3,
      name: "Jane",
      email: "jane.doe@outlook.com",
      phone: "11933520489",
    },
  ];

  const columnNames = ["Id", "Nome", "Email", "Telefone"];

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const rowsPerPage = Number(searchParams.get("numRows") || "5");

  return (
    <>
      <header className="flex gap-4">
        <SearchBar />

        <button
          type="button"
          className="py-2 px-4 rounded-md shadow-md ease-in-out duration-300 hover:bg-sky-800 hover:text-white"
        >
          <FunnelIcon className="h-6 w-6" />
        </button>
      </header>

      <Tb.Results numOfResults={clients.length} />
      <Table columns={columnNames} numOfRows={clients.length}>
        {clients.length > 0 ? (
          clients
            .slice(rowsPerPage * (page - 1), rowsPerPage * page)
            .map((row, rowIndex) => (
              <Tb.Row key={rowIndex}>
                {Object.entries(row).map(([_, value], index) => (
                  <Tb.Cell key={index}>{value}</Tb.Cell>
                ))}
              </Tb.Row>
            ))
        ) : (
          <Tb.Row>
            <Tb.Cell colSpan={columnNames.length}>
              Nenhum resultado foi encontrado.
            </Tb.Cell>
          </Tb.Row>
        )}
      </Table>

      <DataOptions />
    </>
  );
};

export default Databoard;
