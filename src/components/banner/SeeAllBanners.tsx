import useSWR from "swr";
import { LoadingSpinnerPage } from "../ui-kit/LoadingSpinner";
import { PrimaryButtons } from "../ui-kit/buttons/PrimaryButtons";
import router from "@/routes";
import ModalSKeleton from "../ui-kit/ModalSkeleton";
import axiosInstance from "@/services/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import BannerCard from "./BannerCard";
import ModalWarningContent from "../ui-kit/ModalWarningContent";

const SeeAllBanners = () => {
  const [bannerInfo, setBannerInfo] = useState<IBannerPUT>({
    banner_name: "",
    height: 0,
    position: "",
    enable: false,
    id: 0,
    actionType: "",
  });
  const { data, isLoading, mutate } = useSWR<ResponseData<IBanner>>(
    `/panel/banner/get/all/0/100`
  );

  const closeModal = () => {
    setBannerInfo({
      banner_name: "",
      height: 0,
      position: "",
      enable: false,
      id: 0,
      actionType: "",
    });
  };
  const handleRemove = async () => {
    const { id } = bannerInfo;
    try {
      const res = await axiosInstance.delete(`/panel/banner/delete/${id}`);
      if (res.status === 200) {
        closeModal();
        mutate();
        toast.success("بنر با موفقیت حذف شد");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };
  const handleActivation = async () => {
    const { id, enable, height, position, banner_name } = bannerInfo;
    try {
      const res = await axiosInstance.put(`/panel/banner/update/${id}`, {
        height,
        position,
        banner_name,
        enable: !enable,
      });
      if (res.status === 200) {
        closeModal();
        mutate();
        toast.success(`بنر با موفقیت ${enable ? "غیرفعال شد" : "فعال شد"}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  if (isLoading || !data) return <LoadingSpinnerPage />;

  const banners = data.body.content;

  return (
    <>
      <div className="p-4 rounded shadow-md bg-slate-50 dark:bg-slate-700">
        <p className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
          لیست بنر ها
        </p>
        <div className="flex flex-wrap gap-2">
          {banners.map((banner) => (
            <BannerCard
              banner={banner}
              key={banner.id}
              setBannerInfo={setBannerInfo}
            />
          ))}
          <div
            onClick={() => router.navigate("new")}
            className="flex flex-col items-center justify-center w-full m-1 overflow-hidden transition-transform duration-200 bg-white rounded-lg shadow-md cursor-pointer sm:w-72 dark:bg-slate-800 hover:transform hover:scale-105"
          >
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="mb-2 text-lg font-bold text-slate-700 dark:text-slate-300">
                ایجاد بنر جدید
              </p>
              <svg
                className="w-12 h-12 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ModalSKeleton
        title="حذف بنر"
        closeModal={closeModal}
        isShow={bannerInfo.actionType === "delete"}
      >
        <p className="text-slate-700 dark:text-slate-300">
          آيا مي خواهيد بنر {bannerInfo.banner_name} را حذف کنيد؟
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <PrimaryButtons onClick={closeModal}>خیر</PrimaryButtons>
          <PrimaryButtons onClick={handleRemove}>بله</PrimaryButtons>
        </div>
      </ModalSKeleton>
      <ModalSKeleton
        title="فعالسازی بنر"
        closeModal={closeModal}
        isShow={bannerInfo.actionType === "activate"}
      >
        <ModalWarningContent
          textContent={`آيا مي خواهيد بنر ${bannerInfo.banner_name} را
        ${bannerInfo.enable ? "غیرفعال" : "فعال"} کنيد؟`}
          admitFunc={handleActivation}
          rejectFunc={closeModal}
        />
      </ModalSKeleton>
    </>
  );
};

export default SeeAllBanners;
