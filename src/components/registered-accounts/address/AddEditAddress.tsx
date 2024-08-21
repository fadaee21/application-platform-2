import { Suspense, lazy, useState } from "react";
import { TextField } from "@/components/login/TextField";
import axiosPrivate from "@/services/axios";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import useReverseGeocoding from "@/hooks/useReverseGeocoding";
const MapRegUser = lazy(() => import("./MapRegUser"));
interface IProps {
  accountId?: string;
  mutate: KeyedMutator<IAddressUserNew[]>;
  toggleModal: () => void;
  address?: IAddressUserNew;
  isMapEditing?: boolean;
  typeUse: "add" | "edit";
}
const AddEditAddress = ({
  accountId,
  mutate,
  toggleModal,
  address,
  isMapEditing = false,
  typeUse,
}: IProps) => {
  const {
    contactNumber,
    // detail,
    id,
    latAndLong,
    name,
    plaque,
    postalCode,
    unit,
  } = address || {};
  const [position, setPosition] = useState<string | null>(null);
  const [personInfo, setPersonInfo] = useState({
    plaque: plaque || "",
    unit: unit || "",
    postalCode: postalCode || "",
    name: name || "",
    contactNumber: contactNumber || "",
  });
  const [lat, lng] = position
    ? position.split(",")
    : latAndLong
    ? latAndLong.split(",")
    : [undefined, undefined];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonInfo({
      ...personInfo,
      [event.target.name]: event.target.value,
    });
  };

  const { addressData } = useReverseGeocoding(Number(lat), Number(lng));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url =
        typeUse === "edit"
          ? `/v1/admins/address/${accountId}/${id}`
          : `/v1/admins/address/${accountId}`;

      const method = typeUse === "edit" ? axiosPrivate.put : axiosPrivate.post;

      const res = await method(url, {
        ...personInfo,
        plaque: Number(personInfo?.plaque),
        detail: addressData?.formatted_address,
        latAndLong: `${lat},${lng}`,
      });
      if (res.status === 200) {
        toast.success("اطلاعات با موفقیت ثبت شد");
        mutate();
        toggleModal();
      }
    } catch (err) {
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start justify-between w-full">
          <TextField
            id="name"
            placeholder="نام آدرس"
            label="نام آدرس"
            onChange={handleChange}
            state={personInfo.name}
            // disabled={isMapEditing}
          />

          <TextField
            id="plaque"
            placeholder="پلاک"
            label="پلاک"
            onChange={handleChange}
            state={personInfo.plaque.toString()}
          />

          <TextField
            id="contactNumber"
            placeholder="شماره تماس"
            label="شماره تماس"
            onChange={handleChange}
            state={personInfo.contactNumber}
          />
          <TextField
            id="postalCode"
            placeholder="کد پستی"
            label="کد پستی"
            onChange={handleChange}
            state={personInfo.postalCode}
          />
          <TextField
            id="unit"
            placeholder="واحد"
            label="واحد"
            onChange={handleChange}
            state={personInfo.unit.toString()}
          />
        </div>
        <div className="w-full size-60 md:size-96">
          <Suspense fallback={<LoadingSpinnerButton />}>
            <MapRegUser
              disabled={!isMapEditing}
              setMyPosition={setPosition}
              lat={Number(lat)}
              lng={Number(lng)}
            />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <PrimaryButtons type="submit" fullWidth className="mt-10">
          ثبت
        </PrimaryButtons>
      </div>
    </form>
  );
};

export default AddEditAddress;
