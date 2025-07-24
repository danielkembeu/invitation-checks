import React from "react";

type Column = {
  header: string;
  accessor: string;
};

type DataTableProps<T> = {
  columns: Column[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
};

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  renderActions,
}: Readonly<DataTableProps<T>>) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-400"
              >
                Aucune donnée
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx + 1}>
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-4 py-2 whitespace-nowrap"
                  >
                    {row[col.accessor]}
                  </td>
                ))}

                <td className="px-4 py-2 whitespace-nowrap flex gap-2 items-center">
                  {renderActions ? renderActions(row) : null}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
