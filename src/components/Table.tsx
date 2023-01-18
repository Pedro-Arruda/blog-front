import _ from "lodash";

interface TableProps {
  columns: {
    key: string;
    label: string;
  }[];
  Items: {}[];
}

export const Table = ({ columns, Items }: TableProps) => {
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
        {Items.map((item, index) => (
          <tr key={`tr-${index}`}>
            {columns.map((column) => (
              <td
                key={`td-${column.key}`}
                className="border-2 p-2 text-center cursor-pointer"
              >
                {_.get(item, column.key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
