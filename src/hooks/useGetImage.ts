import useSWR from "swr";
import { toast } from "react-toastify";
import axiosPrivate from "@/services/axios";

const useGetImage = (pictureURL: string) => {
  const fetcher = async (url: string) => {
    const response = await axiosPrivate.get(url, {
      responseType: "arraybuffer",
      headers: { Accept: "image/*", "Content-Type": "application/json" },
    });
    return URL.createObjectURL(new Blob([response.data]));
  };

  const {
    data: pic,
    error,
    isLoading,
  } = useSWR(pictureURL, fetcher, {
    onError: (error) => {
      toast.error("مشکل در دریافت عکس");
      console.error(error);
    },
    revalidateOnFocus: false,
    onErrorRetry(_error, _key, _config, _revalidate, { retryCount }) {
      console.log({ retryCount });
      if (retryCount > 2) return;
    },
  });

  return { pic, error, isLoading };
};

export default useGetImage;
