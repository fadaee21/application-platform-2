import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";
import { Popover } from "@headlessui/react";

interface IData {
  timestamp: string;
  body: {
    ibans: string[];
  };
  is_successful: boolean;
}

const ModalSheba = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useSWR<IData>(
    id ? `/panel/accounts/get/ibans/${id}` : null
  );
  if (!id) return <></>;
  const ibans = data?.body.ibans || [];
  if (isLoading) {
    return <LoadingSpinnerTable />;
  }
  if (ibans?.length === 0) {
    return <div>شماره شبا یافت نشد</div>;
  }
  return (
    <ul className="list-disc list-inside  space-y-2 text-left text-blue-500">
      {ibans.map((item, index) => (
        <li key={index} className="p-6 text-left ltr">
          <Popover className="relative inline-block">
            {({ open, close }) => (
              <>
                <Popover.Button
                  className=" cursor-pointer text-left"
                  onClick={() => {
                    navigator.clipboard.writeText(item);
                    setTimeout(() => close(), 2000);
                  }}
                >
                  {item}
                </Popover.Button>

                {open && (
                  <Popover.Panel className="absolute w-fit z-10  p-2 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md">
                    کپی شد
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
        </li>
      ))}
    </ul>
  );
};

export default ModalSheba;
