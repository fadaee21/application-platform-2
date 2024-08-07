import StockComp from "@/components/product/stock/StockComp";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";

const Stock = () => {
  return (
    <>
      <div className="w-full flex justify-end">
        <PrimaryButtons className="mb-4">ذخیره تغییرات</PrimaryButtons>
      </div>
      <div className="space-y-5">
        <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
          <div className="w-full ">
            <StockComp />
          </div>
        </div>
        <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
          <div className="w-full ">
            <StockComp />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
