'use client';

import { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => ReactNode;
}

export default function Table({ columns, data, actions }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={`${idx}-${col.key}`}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada data
        </div>
      )}
    </div>
  );
}
