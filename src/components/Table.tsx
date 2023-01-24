import _ from "lodash";

interface TableProps {
  columns: {
    key: string;
    label: string;
  }[];
  items: {}[];
}

export const Table = ({ columns, items }: TableProps) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={`th-${index}`} className="border-2 p-2 text-center">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`tr-${index}`}>
            {columns.map((column) => (
              <td key={`td-${column.key}`} className="border-2 p-2 text-center">
                {_.get(item, column.key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
