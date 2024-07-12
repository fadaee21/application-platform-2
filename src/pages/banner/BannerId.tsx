import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import clsx from "clsx";
import { bannerPosItems } from "@/components/banner/variablesBanner";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import ImagesInBanner from "@/components/banner/ImagesInBanner";
// import BannerCardId from "@/components/banner/BannerCardId";

const BannerId = () => {
  const { id: bannerId } = useParams();
  const { data, isLoading, mutate } = useSWR<ResponseDataNoArray<IBannerImg>>(
    `/panel/banner/get/${bannerId}`
  );

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }
  // const { b64Images } = data?.body || {};
  // if (b64Images) {
  //   while (b64Images.length < LENGTH_IMAGE_PLACEHOLDER) {
  //     b64Images.push("");
  //   }
  // }

  const { b64Images = [] } = data?.body || {};
  const imagesWithPlaceholder = [...b64Images, ""];

  const heightBanner = clsx(
    {
      0: "h-0",
      30: "h-[188px]",
      50: "h-[208px]",
      80: "h-[238px]",
      100: "h-[258px]",
      130: "h-[288px]",
    }[data?.body.height || 0] || "h-[500px]"
  );

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-semibold whitespace-nowrap">
          {data?.body.name}
        </h1>
        <ReturnButton />
      </div>
      <h6 className="text-xl">
        ارتفاع بنر {data?.body.height}px و موقعیت{" "}
        {
          bannerPosItems.find((item) => item.value === data?.body.position)
            ?.label
        }{" "}
        می باشد.
      </h6>
    <div className="flex flex-wrap justify-center gap-4 mt-4 sm:justify-start ">
        {data &&
          imagesWithPlaceholder.map((b64Image, idx) => (
            <ImagesInBanner
              b64Image={b64Image}
              heightBanner={heightBanner}
              bannerId={bannerId || ""}
              mutate={mutate}
              idx={idx}
              key={idx}
              height={data.body.height}
            />
          ))}
      </div>
    </div>
  );
};

export default BannerId;
