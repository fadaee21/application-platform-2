import AutomaticRegistrationComp from "@/components/app-setting/AutomaticRegistrationComp";
import FieldSettingComp from "@/components/app-setting/FieldSettingComp";

const AppSettings = () => {
  return (
    <>
      <div className="p-4 my-3 bg-white border border-gray-300 rounded-lg shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
        <AutomaticRegistrationComp />
      </div>
      <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
        <FieldSettingComp />
      </div>
    </>
  );
};

export default AppSettings;
