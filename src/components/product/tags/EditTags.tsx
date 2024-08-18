import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Plus from "@/assets/icons/plus.svg?react";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import { TextField } from "@/components/login/TextField";
import axiosPrivate from "@/services/axios";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface EditTagModalProps {
  modalEdit: string | null;
  setModalEdit: (value: string | null) => void;
  editedTagName: string;
  setEditedTagName: (value: string) => void;
  page: number;
}

const EditTagModal = ({
  modalEdit,
  setModalEdit,
  editedTagName,
  setEditedTagName,
  page,
}: EditTagModalProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = `/v1/admins/tag/${modalEdit}`;

      const res = await axiosPrivate.put(url, {
        name: editedTagName,
        status: 0,
      });

      if (res.status === 200) {
        toast.success("اطلاعات با موفقیت ثبت شد");
        mutate(`/v1/admins/tag/search?page=${page - 1}&size=${20}`);
        setModalEdit(null);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  };

  return (
    <ModalSKeleton
      title="ویرایش برچسب"
      closeModal={() => setModalEdit(null)}
      isShow={modalEdit}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <TextField
          id="editTag"
          placeholder=""
          label=""
          onChange={(e) => setEditedTagName(e.target.value)}
          state={editedTagName}
        />
        <PrimaryButtons className="max-w-40" onClick={handleSubmit}>
          <Plus width={20} height={20} />
          اعمال تغییر
        </PrimaryButtons>
      </div>
    </ModalSKeleton>
  );
};

export default EditTagModal;
