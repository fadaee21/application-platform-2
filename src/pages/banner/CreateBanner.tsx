import { useState } from "react";
import router from "@/routes";
import { mutate } from "swr";
import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import {
  bannerHeightItems,
  bannerPosItems,
} from "@/components/banner/variablesBanner";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import { toast } from "react-toastify";

const CreateBanner = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState<SelectedOption | null>(null);
  const [height, setHeight] = useState<SelectedOption | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const createNewBanner = async () => {
    try {
      const res = await axiosPrivate.post("/panel/banner/add", {
        banner_name: name,
        position: position?.value || 0,
        height: height?.value || "",
        enable: false,
      });
      if (res.status === 200) {
        router.navigate(-1);
        mutate(`/panel/banner/get/all/0/100`);
        toast.success("بنر با موفقیت ایجاد شد");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 my-3 bg-white border border-gray-300 rounded-lg shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">ایجاد بنر</p>
        <ReturnButton />
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        <TextField
          id="name"
          placeholder="نام بنر"
          label="نام "
          onChange={(e) => setName(e.target.value)}
          state={name}
        />

        <div className="w-full my-5">
          <ListBoxSelect
            selected={position}
            setSelected={setPosition}
            items={bannerPosItems}
            label="جایگاه بنر"
            className="my-20"
          />
        </div>
        <ListBoxSelect
          selected={height}
          setSelected={setHeight}
          items={bannerHeightItems}
          label="ارتفاع بنر"
          className="mb-10"
        />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <PrimaryButtons onClick={createNewBanner} fullWidth className="my-10">
            ایجاد بنر
          </PrimaryButtons>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
