import { useState } from "react";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Plus from "@/assets/icons/plus.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import Search from "@/assets/icons/search.svg?react";
import Pagination from "@/components/ui-kit/Pagination";
import { Checkbox } from "@headlessui/react";
import useSWR from "swr";
import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import { TextField } from "@/components/login/TextField";
import EditTagModal from "@/components/product/tags/EditTags";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";

const PAGE_SIZE = 20;
const Tags = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(
    `/v1/admins/tag/search?page=${page - 1}&size=${PAGE_SIZE}`
  );

  const [checkedTags, setCheckedTags] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [search, setSearch] = useState<string | null>("");
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [newTag, setNewTag] = useState("");
  const [editedTagName, setEditedTagName] = useState<string>("");
  const [modalEdit, setModalEdit] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedTags((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditClick = () => {
    const checkedTagIds = Object.keys(checkedTags).filter(
      (id) => checkedTags[id]
    );

    if (checkedTagIds.length === 1) {
      const checkedId = checkedTagIds[0];
      const checkedName =
        data._embedded.tagSearchResponseList.find(
          (tag: string) => tag.id === checkedId
        )?.name || "";
      setEditedTagName(checkedName);
      setModalEdit(checkedId);
    }
  };

  const handleChangeNewTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddNewTag = () => {
    console.log("New tag:", newTag);
    setModalAdd(false);
  };

  const isOneChecked = Object.values(checkedTags).filter(Boolean).length === 1;
  const totalElements = data?.page.totalElements || 0;

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }

  return (
    <div>
      <div className="w-full flex justify-end">
        <h6 className="ml-auto text-xl">برچسب ها</h6>
        <PrimaryButtons className="mb-4" onClick={() => setModalAdd(true)}>
          <Plus className="w-6 h-6 ml-4" />
          برچسب جدید
        </PrimaryButtons>
      </div>
      <div className="p-4 rounded flex flex-col justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
        <div className="w-80 pb-4">
          <TextField
            id="addressName"
            placeholder="جستجوی در برچسب ها"
            label=""
            onChange={handleChange}
            state={search}
            icon={<Search width={20} height={20} />}
          />
        </div>
        <div>
          {data._embedded.tagSearchResponseList.map((tag, i) => (
            <div className="flex pb-4" key={i}>
              <Checkbox
                checked={!!checkedTags[tag.id]}
                onChange={() => handleCheckboxChange(tag.id)}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <p className="pr-2">{tag.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end p-4">
          <Edit
            width={30}
            height={30}
            className={`mx-2  ${
              isOneChecked ? "cursor-pointer" : "opacity-50"
            }`}
            onClick={isOneChecked ? handleEditClick : undefined}
          />
          <Copy
            width={30}
            height={30}
            className="mx-2 opacity-50"
            onClick={() => console.log("copy")}
          />
        </div>
        <Pagination
          currentPage={page}
          onPageChange={(value) => setPage(value)}
          pageSize={PAGE_SIZE}
          totalCount={totalElements}
        />
      </div>

      <EditTagModal
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        editedTagName={editedTagName}
        setEditedTagName={setEditedTagName}
        page={page}
      />

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
    </div>
  );
};

export default Tags;
