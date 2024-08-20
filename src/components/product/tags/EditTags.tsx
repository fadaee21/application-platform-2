import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Plus from "@/assets/icons/plus.svg?react";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import { TextField } from "@/components/login/TextField";
import { toast } from "react-toastify";
import { mutate } from "swr";
import useFetcherPut from "@/hooks/useFetcherPut";
import useSWRMutation from "swr/mutation";

interface EditTagModalProps {
  modalEdit: string | null;
  setModalEdit: (value: string | null) => void;
  editedTagName: string;
  setEditedTagName: (value: string) => void;
  page: number;
  setCheckedTags: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

const EditTagModal = ({
  modalEdit,
  setModalEdit,
  editedTagName,
  setEditedTagName,
  page,
  setCheckedTags,
}: EditTagModalProps) => {
  const fetcherPut = useFetcherPut();

  const { trigger, isMutating } = useSWRMutation(
    `/v1/admins/tag/${modalEdit}`,
    fetcherPut
  );
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await trigger({
        name: editedTagName,
        status: 1,
      });

      toast.success("اطلاعات با موفقیت ثبت شد");
      mutate(`/v1/admins/tag/search?page=${page - 1}&size=20`);
      setModalEdit(null);
      setCheckedTags({});
    } catch (err) {
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  return (
    <ModalSKeleton
      title="ویرایش برچسب"
      closeModal={() => setModalEdit(null)}
      isShow={!!modalEdit}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <TextField
          id="editTag"
          placeholder=""
          label=""
          onChange={(e) => setEditedTagName(e.target.value)}
          state={editedTagName}
        />
        <PrimaryButtons
          className="max-w-40"
          onClick={handleSubmit}
          disabled={isMutating}
        >
          {isMutating ? (
            <LoadingSpinnerButton />
          ) : (
            <>
              <Plus width={20} height={20} />
              اعمال تغییر
            </>
          )}
        </PrimaryButtons>
      </div>
    </ModalSKeleton>
  );
};

export default EditTagModal;
