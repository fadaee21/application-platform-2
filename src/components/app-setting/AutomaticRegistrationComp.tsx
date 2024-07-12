import MySwitch from "../ui-kit/MySwitch";
import axiosInstance from "@/services/axios";
import useSWR, { mutate } from "swr";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";

const AutomaticRegistrationComp = () => {
  const { data: autoRegisteredStatus, isLoading: autoRegisteredStatusLoading } =
    useSWR<ResponseDataNoPagination<IAutomaticRegistration>>(
      "/panel/options/app"
    );
  const automatic_registration = autoRegisteredStatus?.body.find(
    (item) => item.keyName === "automatic_registration"
  );
  const toggleAutomaticRegistration = async () => {
    const newValue = isAutomaticReg ? "disable" : "enable";
    const res = await axiosInstance.put(
      `/panel/options/automatic_registration/${newValue}`
    );
    if (res.status === 200) {
      await mutate("/panel/options/app", {
        ...autoRegisteredStatus,
        body: [{ ...automatic_registration, value: newValue }],
      });
    }
  };
  const isAutomaticReg = automatic_registration?.value === "1";
  if (autoRegisteredStatusLoading) return <LoadingSpinnerTable />;
  return (
    <>
      <p className="mt-2 font-extrabold text-gray-600 dark:text-slate-300">
        فعال سازی ثبت‌نام اتوماتیک
      </p>
      <div className="mt-4 md:mt-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-slate-300">
            {isAutomaticReg ? "فعال" : "غیرفعال"}
          </p>
          <MySwitch
            checked={isAutomaticReg}
            onChange={toggleAutomaticRegistration}
          />
        </div>
      </div>
    </>
  );
};

export default AutomaticRegistrationComp;
