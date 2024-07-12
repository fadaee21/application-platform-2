// src/components/UserAddress.tsx
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import MapComponent from "./MapRegUser";
import { toast } from "react-toastify";
import axiosPrivate from "@/services/axios";
import { KeyedMutator } from "swr";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import { useState } from "react";
import ModalWarningContent from "@/components/ui-kit/ModalWarningContent";
import AddEditAddress from "./AddEditAddress";

interface IProps {
  address: IAddressUser;
  mutate: KeyedMutator<ResponseDataNoPagination<IAddressUser>>;
  accountId?: string;
}

const UserAddress = ({ address, mutate, accountId }: IProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);
  const { longAndLat, addressName, number, phoneNo, postalCode, unit } =
    address;
  const [lat, lng] = longAndLat
    ? longAndLat.split(",").map(Number)
    : [undefined, undefined];

  const handleRemoveAddress = async () => {
    try {
      const res = await axiosPrivate.delete(
        `/panel/accounts/address/delete/${accountId}/${addressName}`
      );
      if (res.status === 200) {
        toast.success("اطلاعات با موفقیت حذف شد");
        mutate();
        toggleDeleteModal();
      }
    } catch (err) {
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  return (
    <>
      <h2 className="m-1 text-xl font-bold mb-6 md:mb-0">{addressName}</h2>
      <div className="flex flex-col h-auto m-1 overflow-hidden md:flex-row md:h-80">
        <div className="flex flex-col order-2 w-full h-full px-4 md:w-1/2 md:order-1">
          <ul className="my-3 space-y-2 text-lg">
            <li>
              <strong>پلاک:</strong> {number}
            </li>
            <li>
              <strong>واحد:</strong> {unit}
            </li>
            <li>
              <strong>کد پستی:</strong> {postalCode}
            </li>
            <li>
              <strong>شماره تماس :</strong> {phoneNo}
            </li>
          </ul>
          <div className="flex flex-col gap-2 mt-auto md:flex-row">
            <PrimaryButtons fullWidth onClick={toggleDeleteModal}>
              حذف
            </PrimaryButtons>
            <PrimaryButtons fullWidth onClick={toggleEditModal}>
              ویرایش
            </PrimaryButtons>
          </div>
        </div>
        <div className="z-0 order-1 w-full px-1 h-60 md:w-1/2 md:h-full md:order-2">
          <MapComponent lat={lat} lng={lng} disabled={true} />
        </div>
      </div>
      <ModalSKeleton
        title="حذف آدرس"
        closeModal={toggleDeleteModal}
        isShow={deleteModal}
      >
        <ModalWarningContent
          textContent={`از حذف آدرس  ${addressName} مطمئن هستید؟`}
          admitFunc={handleRemoveAddress}
          rejectFunc={toggleDeleteModal}
        />
      </ModalSKeleton>
      <ModalSKeleton
        title={`ویرایش آدرس ${addressName}`}
        closeModal={toggleEditModal}
        isShow={editModal}
      >
        <AddEditAddress
          toggleModal={toggleEditModal}
          accountId={accountId}
          mutate={mutate}
          address={address}
          isMapEditing={true}
          typeUse="edit"
        />
      </ModalSKeleton>
    </>
  );
};

export default UserAddress;
