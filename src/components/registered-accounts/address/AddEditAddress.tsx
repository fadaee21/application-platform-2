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
  mutate: KeyedMutator<ResponseDataNoPagination<IAddressUser>>;
  toggleModal: () => void;
  address?: IAddressUser;
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
  const { addressName, number, unit, postalCode, phoneNo, longAndLat } =
    address || {};
  const [position, setPosition] = useState<string | null>(null);
  const [personInfo, setPersonInfo] = useState({
    number: number || "",
    unit: unit || "",
    postalCode: postalCode || "",
    addressName: addressName || "",
    phoneNo: phoneNo || "",
  });
  const [lat, lng] = position
    ? position.split(",")
    : longAndLat
    ? longAndLat.split(",")
    : [undefined, undefined];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonInfo({
      ...personInfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url =
        typeUse === "edit"
          ? `/panel/accounts/address/update/${accountId}/${addressName}`
          : `/panel/accounts/address/add/${accountId}`;

      const method = typeUse === "edit" ? axiosPrivate.put : axiosPrivate.post;

      const res = await method(url, {
        ...personInfo,
        longAndLat: `${lat},${lng}`,
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

  const { addressData } = useReverseGeocoding(Number(lat), Number(lng));

  console.log(addressData);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start justify-between w-full">
          <TextField
            id="addressName"
            placeholder="نام آدرس"
            label="نام آدرس"
            onChange={handleChange}
            state={personInfo.addressName}
            // disabled={isMapEditing}
          />

          <TextField
            id="number"
            placeholder="پلاک"
            label="پلاک"
            onChange={handleChange}
            state={personInfo.number.toString()}
          />

          <TextField
            id="phoneNo"
            placeholder="شماره تماس"
            label="شماره تماس"
            onChange={handleChange}
            state={personInfo.phoneNo}
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
