import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import { TextField } from "@/components/login/TextField";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Plus from "@/assets/icons/plus.svg?react";
import { useState } from "react";

import axiosPrivate from "@/services/axios";
import { toast } from "react-toastify";
function AddTags() {
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [newTag, setNewTag] = useState("");

  const handleChangeNewTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddNewTag = async () => {
    const bodyContent = {
      name: newTag,
      type: 0, 
    };
    try {
      await axiosPrivate.post(`/v1/admins/tag`, bodyContent, {
        headers: {
            "Content-Type": "application/json", 
        },
      });
      toast.success("برچسب با موفقیت افزوده شد");
    } catch (error) {
      console.error("Error uploading tags:", error);
      toast.error("خطا در افزودن برچسب");
    } finally {
      setModalAdd(false);
    }
  };
  return (
    <>
      <PrimaryButtons className="mb-4" onClick={() => setModalAdd(true)}>
        <Plus className="w-6 h-6 ml-4" />
        برچسب جدید
      </PrimaryButtons>
      <ModalSKeleton
        title="ایجاد برچسب جدید"
        closeModal={() => setModalAdd(false)}
        isShow={modalAdd}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <TextField
            id="addTag"
            placeholder="برچسب جدید"
            label=""
            onChange={handleChangeNewTag}
            state={newTag}
          />
          <PrimaryButtons className="max-w-40" onClick={handleAddNewTag}>
            <Plus width={20} height={20} />
            ایجاد برچسب جدید
          </PrimaryButtons>
        </div>
      </ModalSKeleton>
    </>
  );
}

export default AddTags;
