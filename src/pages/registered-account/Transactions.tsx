import SimpleTable from "@/components/registered-accounts/SimpleTable";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import Pagination from "@/components/ui-kit/Pagination";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const pageSize = 10;
const Transactions = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data: transactions, isLoading: transactionsLoading } = useSWR<{
    body: { transactions: Transaction[]; totalElements: number };
  }>(`/panel/payment/transactions/get/${id}/${page - 1}/${pageSize}`);
  const { data: walletBalance, isLoading: walletBalanceLoading } = useSWR<{
    body: { balance: number; currency: string };
  }>(`/panel/payment/wallet/balance/get/${id}`);

  const rial = new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    notation: "compact",
  });
  const dateShamsi = new Intl.DateTimeFormat("fa-IR");
  return (
    <>
      <div className="text-center bg-cyan-100/60 dark:bg-cyan-950  max-w-xl mx-auto p-10 rounded-md mb-6">
        {walletBalanceLoading ? (
          <LoadingSpinnerButton />
        ) : (
          <>
            {walletBalance?.body.balance === 0 ? (
              <p>کیف پول شما در حال حاضر خالی است.</p>
            ) : (
              <p>
                مانده کیف پول {rial.format(walletBalance?.body.balance || 0)} می
                باشد.
              </p>
            )}
          </>
        )}
      </div>
      <div className="h-[580px] w-full">
        <SimpleTable
          headers={headers}
          data={
            transactions?.body.transactions.map(
              ({ amount, status, gateway_type, created_at }) => ({
                amount,
                //   currency,
                status,
                gateway_type,
                created_at: dateShamsi.format(new Date(created_at)),
              })
            ) || []
          }
          isLoading={transactionsLoading}
          totalElements={transactions?.body.totalElements || 0}
        />
      </div>
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={pageSize}
        totalCount={transactions?.body.totalElements || 0}
      />
    </>
  );
};

export default Transactions;

const headers = [
  //   { label: "ID", key: "id" },
  //   { label: "ارز", key: "currency" },
  { label: "وضعیت", key: "status" },
  { label: "مبلغ", key: "amount" },
  { label: "درگاه پرداخت ", key: "gateway_type" },
  { label: "تاریخ", key: "created_at" },
];
