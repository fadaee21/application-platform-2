import useSWR from "swr";
import Pagination from "../ui-kit/Pagination";
import { useState } from "react";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import router from "@/routes";
import useFetcherPost from "@/hooks/useFetcherPost";

interface IProps {
  selectedOption: {
    value: string;
    label: string;
  } | null;
}
const pageSize = 20;

const TableContent = ({ selectedOption }: IProps) => {
  const [, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const selectedOptionValue = selectedOption?.value;
  // const { data, isLoading } = useSWR<ResponseData<User>>(
  //   `/panel/accounts/get/${selectedOptionValue}/${page - 1}/${pageSize}`
  // );
  // const totalElements = data?.body.totalElements || 0;

  const fetcherPost = useFetcherPost();

  const fetchUrl = (key: string | undefined = "") =>
    `http://78.109.199.178:8080/v1/admins/user/search?page=0&size=10&key=${key}`;

  const { data, isLoading } = useSWR(
    selectedOption?.value ? fetchUrl(selectedOption.value) : null,
    (url) =>
      fetcherPost<IPostUserStatus, RootResponseNew<userSearchArr>>(url, {
        arg: {
          userStatus: Number(selectedOption?.value),
        },
      })
  );

  const totalElements = data?.page.totalElements || 0;
  const handleClick = (id: string) => {
    setSearchParams({ id: id.toString(), showModal: "true" });
  };

  const handleNavigate = (id: string, path: string) => {
    router.navigate(`${path}/${id}`);
  };

  return (
    <>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-950 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-800">
              <thead className="bg-gray-300 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                  >
                    نام
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                  >
                    نام خانوادگی
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                  >
                    تارخ تولد
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                  >
                    نام کاربری
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                  >
                    موبایل
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300">
                                    ایمیل
                                </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                  >
                    کد ملی
                  </th>
                  {selectedOptionValue === "4" && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-700 dark:text-slate-300"
                    >
                      عملیات
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
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
                          colSpan={6}
                          className="px-6 py-4 text-center whitespace-nowrap"
                        >
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            هیچ کاربری یافت نشد
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data._embedded.userSearchResponseList.map((user) => {
                        const {
                          firstName: first_name,
                          userId: id,
                          lastName: last_name,
                          phoneNumber: mobile,
                          username,
                        } = user;
                        return (
                          <tr key={id}>
                            <td className="px-6 py-4 text-center whitespace-nowrap ">
                              <div className="text-sm text-slate-700 dark:text-slate-300 ">
                                {first_name || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                {last_name || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                {username || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                {mobile || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                {/* {national_code || "-"} */}
                              </div>
                            </td>
                            {selectedOptionValue === "4" && (
                              <td className="px-6 py-4 text-center whitespace-nowrap flex gap-2 justify-center">
                                <div className="text-sm text-slate-700 dark:text-slate-300">
                                  <button
                                    onClick={() => handleClick(user.userId)}
                                  >
                                    شبا
                                  </button>
                                </div>
                                |
                                <div className="text-sm text-slate-700 dark:text-slate-300">
                                  <button
                                    onClick={() =>
                                      handleNavigate(
                                        user.userId,
                                        "transactions"
                                      )
                                    }
                                  >
                                    تراکنش ها
                                  </button>
                                </div>
                                |
                                <div className="text-sm text-slate-700 dark:text-slate-300">
                                  <button
                                    onClick={() =>
                                      handleNavigate(user.userId, "address")
                                    }
                                  >
                                    آدرس
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={pageSize}
        totalCount={totalElements}
      />
    </>
  );
};

export default TableContent;
