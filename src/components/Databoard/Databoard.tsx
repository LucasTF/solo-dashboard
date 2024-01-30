"use client";

import { useSearchParams } from "next/navigation";

import Table, { Tb } from "../Table";

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
  );
};

export default Databoard;
