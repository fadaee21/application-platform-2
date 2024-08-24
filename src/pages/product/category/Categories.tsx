import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Pagination from "@/components/ui-kit/Pagination";
import useFetcherPost from "@/hooks/useFetcherPost";
import router from "@/routes";
import { useState } from "react";
import useSWR from "swr";
import {  LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import Plus from "@/assets/icons/plus.svg?react";

const Categories = () => {
  const [page, setPage] = useState(1);

  const fetcherPost = useFetcherPost();
  const PAGE_SIZE = 20;

  const fetchUrl = `/v1/admins/category/search?page=${
    page - 1
  }&size=${PAGE_SIZE}`;

  const { data, isLoading } = useSWR<
    RootResponseNew<CategorySearchResponseList>
  >(fetchUrl, {
    fetcher: () =>
      fetcherPost<object, RootResponseNew<CategorySearchResponseList>>(
        fetchUrl,
        {
          arg: {},
        }
      ),
  });
  const totalElements = data?.page.totalElements || 0;

  if (isLoading) {
    return (
        <LoadingSpinnerPage />
    );
  }

  const categories = data?._embedded.categorySearchResponseList || [];
  if (categories.length === 0) {
    return (
      <div className="grid place-content-center w-full h-96">
        <p>شما دسته بندی برای محصولات خود ندارید</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-end">
        <h6 className="ml-auto text-xl">دسته بندی ها</h6>
        <PrimaryButtons className="mb-4" onClick={() => router.navigate("add")}>
          <Plus className="w-6 h-6 ml-4" />
          دسته بندی جدید
        </PrimaryButtons>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?._embedded.categorySearchResponseList.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            {category.images && category.images.length > 0 && (
              <img
                src={category.images[0]}
                alt={category.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
            )}

            <h2 className="text-lg font-semibold mb-2">{category.name}</h2>

            <p className="text-gray-600 mb-2">{category.description}</p>

            {category.tags && category.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {category.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <Pagination
          currentPage={page}
          onPageChange={(value) => setPage(value)}
          pageSize={PAGE_SIZE}
          totalCount={totalElements}
        />
      </div>
    </>
  );
};

export default Categories;
