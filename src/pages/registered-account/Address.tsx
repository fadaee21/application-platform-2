import AddAddress from "@/components/registered-accounts/address/AddEditAddress";
import ListAddress from "@/components/registered-accounts/address/ListAddress";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import EmptyData from "@/components/ui-kit/EmptyData";
import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export const Address = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const { accountId } = useParams();
  const { data, isLoading, mutate } = useSWR<IAddressUserNew[]>(
  // >(`/panel/accounts/address/get_all/${accountId}`);
    `/v1/admins/address/${accountId}`
  );

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-auto">آدرس‌ها</h1>
        <div className="flex gap-2">
          <PrimaryButtons onClick={toggleModal}>افزودن آدرس</PrimaryButtons>
          <ReturnButton />
        </div>
      </div>
      {data ? (
        <ListAddress data={data} mutate={mutate} accountId={accountId} />
      ) : (
        <EmptyData text="هیچ آدرسی وجود ندارد" />
      )}
      <ModalSKeleton
        title="افزودن آدرس"
        closeModal={toggleModal}
        isShow={showModal}
      >
        <AddAddress
          toggleModal={toggleModal}
          accountId={accountId}
          mutate={mutate}
          isMapEditing
          typeUse="add"
        />
      </ModalSKeleton>
    </>
  );
};
