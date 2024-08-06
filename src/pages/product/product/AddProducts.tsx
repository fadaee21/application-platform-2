import AddProductComp from "@/components/product/product/AddProductComp";
import OutlineButton from "@/components/ui-kit/buttons/OutlineButton";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";

const AddProducts = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex gap-4 items-center justify-start">
        <h6 className="ml-auto text-xl">اضافه کردن محصول جدید</h6>
        <OutlineButton>انصراف</OutlineButton>
        <PrimaryButtons>ذخیره</PrimaryButtons>
      </div>
      <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
        <AddProductComp />
      </div>
    </div>
  );
};

export default AddProducts;
