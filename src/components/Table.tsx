import _ from "lodash";

interface TableProps {
  columns: {
    key: string;
    label: string;
    render?: (item: any, index: number) => JSX.Element;
  }[];
  items: {}[];
}

export const Table = ({ columns, items }: TableProps) => {
  return (
    <table className="w-full border-collapse table-auto  overflow-x-scroll">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={`th-${index}`} className=" p-2 text-center">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`tr-${index}`}>
            {columns.map((column) => {
              if (column.render) {
                return (
                  <td
                    key={`tr-td-${column.key}`}
                    className="border-b-2 p-3 text-center"
                  >
                    {column.render(item, index)}
                  </td>
                );
              }
              return (
                <td
                  key={`td-${column.key}`}
                  className="border-b-2 p-3 text-center"
                >
                  {_.get(item, column.key)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
