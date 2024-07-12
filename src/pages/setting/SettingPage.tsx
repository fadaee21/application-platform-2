import MySwitch from "@/components/ui-kit/MySwitch";
import { useTheme } from "@/hooks/context/useTheme";

const SettingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-0 sm:-rotate-6 -rotate-6  rounded-lg sm:rounded-3xl"></div>
        <div className="relative px-4 sm:px-8 py-10 bg-slate-50 dark:bg-slate-700 shadow-lg rounded-lg sm:rounded-3xl sm:p-20 w-full sm:w-96 lg:w-[700px]">
          <h1 className="md:text-2xl text-xl font-semibold text-gray-900 dark:text-slate-50">
            تنظیمات تم
          </h1>
          <p className="mt-2 text-gray-600 dark:text-slate-300">
            تم برنامه خود را تغییر دهید.
          </p>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-slate-300">
                حالت {isDark ? "تاریک" : "روشن"}
              </p>
              <MySwitch checked={isDark} onChange={toggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
