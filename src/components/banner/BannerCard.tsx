import router from "@/routes";
import { bannerPosItems } from "./variablesBanner";
import { PrimaryButtons } from "../ui-kit/buttons/PrimaryButtons";

interface IProps {
  banner: IBanner;
  setBannerInfo: React.Dispatch<React.SetStateAction<IBannerPUT>>;
}

const BannerCard = ({ banner, setBannerInfo }: IProps) => {
  const handleNavigate = (id: number, path?: string) => {
    router.navigate(`${path ? `${path}/` : ""}${id}`);
  };

  const handleRemoveModal = (banner: IBanner) => {
    setBannerInfo({
      enable: banner.enable,
      height: banner.height,
      position: banner.position,
      banner_name: banner.name,
      id: banner.id,
      actionType: "delete",
    });
  };

  const handleActivationModal = (banner: IBanner) => {
    setBannerInfo({
      enable: banner.enable,
      height: banner.height,
      position: banner.position,
      banner_name: banner.name,
      id: banner.id,
      actionType: "activate",
    });
  };

  return (
    <div
      key={banner.id}
      className="w-full m-1 overflow-hidden transition-transform duration-200 bg-white rounded-lg shadow-md sm:w-72 dark:bg-slate-800 hover:transform hover:scale-105"
    >
      {banner.firstB64Image ? (
        <img
          src={`data:image/png;base64,${banner.firstB64Image}`}
          alt="image"
          className="object-cover w-full h-36"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            height: "9rem",
            width: "100%",
            objectFit: "contain",
          }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )}
      <div className="p-4">
        <p className="mb-2 text-xl font-bold text-slate-700 dark:text-slate-300">
          {banner.name}
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          ارتفاع بنر {banner.height}px - موقعیت{" "}
          {
            bannerPosItems.find((element) => element.value === banner.position)
              ?.label
          }
        </p>
        <div className="flex justify-between gap-2">
          <PrimaryButtons fullWidth onClick={() => handleNavigate(banner.id)}>
            مشاهده
          </PrimaryButtons>
          <PrimaryButtons fullWidth onClick={() => handleRemoveModal(banner)}>
            حذف
          </PrimaryButtons>
        </div>
        <PrimaryButtons
          className="my-2"
          fullWidth
          onClick={() => handleActivationModal(banner)}
        >
          {banner.enable ? "غیرفعال شود" : "فعال شود"}
        </PrimaryButtons>
      </div>
    </div>
  );
};

export default BannerCard;
