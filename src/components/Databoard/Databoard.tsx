"use client";

import { useSearchParams } from "next/navigation";

import { Table } from "../Table";

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
    <Table.Base columns={columnNames} numOfRows={clients.length}>
      {clients.length > 0 ? (
        clients
          .slice(rowsPerPage * (page - 1), rowsPerPage * page)
          .map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Object.entries(row).map(([_, value], index) => (
                <Table.Cell key={index}>{value}</Table.Cell>
              ))}
            </Table.Row>
          ))
      ) : (
        <Table.Row>
          <Table.Cell colSpan={columnNames.length}>
            Nenhum resultado foi encontrado.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Base>
  );
};

export default Databoard;
