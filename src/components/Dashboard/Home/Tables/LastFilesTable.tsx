import { Table } from "@/components/Table";
import { FileLink } from "@/components/ui/FileLink";
import { LatestFile } from "@/lib/actions/data/home";

import format from "@/lib/utils/dateFormatter";

type LastFilesTableProps = {
  latestFiles: LatestFile[];
};

export const LastFilesTable = ({ latestFiles }: LastFilesTableProps) => {
  return (
    <Table.Base columns={["Arquivo", "Obra", "Data"]}>
      {latestFiles.map((row, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <FileLink
              title={row.fileName}
              href={`${process.env.NEXT_PUBLIC_STATIC_SERVER_URI}/${row.filePath}/${row.fileName}`}
            />
          </Table.Cell>
          <Table.Cell>{row.obra}</Table.Cell>
          <Table.Cell>
            {format(row.createdAt, "DDMMYYYY", true, "/")}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Base>
  );
};
