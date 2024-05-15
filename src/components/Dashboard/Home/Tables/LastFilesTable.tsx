import { Table } from "@/components/Table";
import { FileLink } from "@/components/ui/FileLink";

import { formatLocalTime } from "@/lib/utils/dateFormatter";

type LastFilesTableProps = {
  latestFiles: any[]; // TODO: Replace with LatestFiles Type
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
          <Table.Cell>{formatLocalTime(row.createdAt)}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Base>
  );
};
