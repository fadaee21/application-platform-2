import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import { LoadingSpinnerButton } from "../ui-kit/LoadingSpinner";
import { PrimaryButtons } from "../ui-kit/buttons/PrimaryButtons";
import { toast } from "react-toastify";
import { useState } from "react";
import ImageUploaderBanner from "./ImageUploaderBanner";

interface IProps {
  idx: number;
  b64Image: string | null;
  heightBanner: string;
  mutate: () => void;
  bannerId: string;
  height: number;
}
const ImagesInBanner = ({
  idx,
  b64Image,
  heightBanner,
  mutate,
  bannerId,
  height,
}: IProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [removeLoading, setRemoveLoading] = useState(false);
  const handleImageRemove = async (imageIndex: number) => {
    setRemoveLoading(true);
    try {
      await axiosPrivate.delete(
        `/panel/banner/delete/image/${bannerId}/${imageIndex}`
      );
      mutate();
      toast.success("عکس با موفقیت حذف شد");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("خطا در حذف عکس");
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div
      key={idx}
      className={`w-[220px] bg-white dark:bg-slate-800 rounded-md shadow-md overflow-hidden border flex flex-col items-center p-1 justify-start ${heightBanner}`}
    >
      {b64Image ? (
        <>
          <img
            src={`data:image/png;base64,${b64Image}`}
            alt="banner"
            className="object-fill w-full mb-auto rounded-t-md"
          />
          <PrimaryButtons
            fullWidth
            onClick={() => handleImageRemove(idx)}
            disabled={removeLoading}
          >
            {removeLoading ? <LoadingSpinnerButton /> : "حذف"}
          </PrimaryButtons>
        </>
      ) : (
        <ImageUploaderBanner
          callBackFunc={mutate}
          bannerId={bannerId}
          bannerHeight={height}
        />
      )}
    </div>
  );
};

export default ImagesInBanner;
