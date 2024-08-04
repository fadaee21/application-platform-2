import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import router from "@/routes";

const Categories = () => {
  return (
    <>
      <div className="flex justify-end gap-4 mt-4">
        <PrimaryButtons 
        onClick={()=>router.navigate("add")}
        >دسته بندی جدید</PrimaryButtons>
      </div>
      <div className="grid place-content-center w-full h-96">
        <p>شما دسته بندی برای محصولات خود ندارید</p>
      </div>
    </>
  );
};

export default Categories;
