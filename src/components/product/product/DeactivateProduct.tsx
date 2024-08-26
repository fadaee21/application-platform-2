import { useMemo, useState } from "react";
import ProductsListStructure from "./productsListStructure";
import useFetcherPost from "@/hooks/useFetcherPost";
import useSWR from "swr";
import Pagination from "@/components/ui-kit/Pagination";
import { LoadingSpinnerTable } from "@/components/ui-kit/LoadingSpinner";

const AllProducts = ({ pageSize }: { pageSize: number }) => {
  const [page, setPage] = useState(1);
  const fetcherPost = useFetcherPost();

  const fetchUrl = `/v1/admins/product/search?page=${
    page - 1
  }&size=${pageSize}&forceFirstAndLastRels=true&status=0`;

  const { data: productData, isLoading: productIsLoading } = useSWR<
    RootResponseNew<ProductSearchResponseList>
  >(fetchUrl, {
    fetcher: () =>
      fetcherPost<
        { id: string | null; name: string | null; status: number | null },
        RootResponseNew<ProductSearchResponseList>
      >(fetchUrl, {
        arg: {
          name: null,
          status: 0,
          id: null,
        },
      }),
  });

  const products = useMemo(
    () => productData?._embedded?.productSearchResponseList || [],
    [productData]
  );

  if (productIsLoading) return <LoadingSpinnerTable />;
  if (products.length === 0) return <h1>هیچ محصولی وجود ندارد</h1>;

  return (
    <>
      <ProductsListStructure res={products} />
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={pageSize}
        totalCount={productData?.page.totalElements || 0}
      />
    </>
  );
};

export default AllProducts;
