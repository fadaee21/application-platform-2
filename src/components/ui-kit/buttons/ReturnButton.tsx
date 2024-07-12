import ChevronLeft from "@/assets/icons/chevron-left.svg?react";
import router from "@/routes";

const ReturnButton = () => {
  const handleNavigate = () => {
    router.navigate(-1);
  };

  return (
    <button
      onClick={handleNavigate}
      className={
        "w-28 flex items-center justify-center py-2 rounded-md shadow-md whitespace-nowrap bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-900 hover:dark:bg-indigo-800 hover:text-slate-900 hover:dark:text-slate-50 text-gray-800 dark:text-slate-300"
      }
    >
      بازگشت
      <ChevronLeft className="w-4 h-4 mr-4" />
    </button>
  );
};

export default ReturnButton;
