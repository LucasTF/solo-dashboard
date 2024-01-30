type HeadProps = {
  columns: string[];
};

export const Head = ({ columns }: HeadProps) => {
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th
            key={index}
            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
            scope="col"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};
