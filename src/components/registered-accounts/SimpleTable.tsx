import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";

interface IProps {
  headers: {
    label: string;
    key: string;
  }[];
  data: { [key: string]: any }[];
  isLoading: boolean;
  totalElements: number;
}

const SimpleTable = ({ data, headers, isLoading, totalElements }: IProps) => {
  return (
    <>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-950 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
              <thead className="bg-gray-300 dark:bg-gray-800">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-6 py-4 text-center whitespace-nowrap"
                    >
                      <LoadingSpinnerTable />
                    </td>
                  </tr>
                ) : (
                  <>
                    {totalElements === 0 || !data ? (
                      <tr>
                        <td
                          colSpan={headers.length}
                          className="px-6 py-4 text-center whitespace-nowrap"
                        >
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            هیچ کاربری یافت نشد
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={index}>
                          {headers.map((header, index) => (
                            <td
                              key={index}
                              className="px-6 py-4 text-center whitespace-nowrap"
                            >
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                {item[header.key] || "-"}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleTable;
