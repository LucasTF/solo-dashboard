type HeadProps = {
  columns: string[];
};

export const Head = ({ columns }: HeadProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-slate-100 dark:bg-gray-800 first:rounded-tl-md last:rounded-tr-md"
            scope="col"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
