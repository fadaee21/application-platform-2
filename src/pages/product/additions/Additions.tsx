import { useState } from "react";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Plus from "@/assets/icons/plus.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import Search from "@/assets/icons/search.svg?react";
import Pagination from "@/components/ui-kit/Pagination";
import { Checkbox } from "@headlessui/react";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import { TextField } from "@/components/login/TextField";
import router from "@/routes";

const Additions = () => {
  const [search, setSearch] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [checkedTags, setCheckedTags] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [modalEdit, setModalEdit] = useState<string | null>(null);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [newTag, setNewTag] = useState("");
  const [editedTagName, setEditedTagName] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (id: number) => {
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
      const tagId = checkedTagIds[0];
      const tagName =
        data.additions.find((tag) => tag.id === parseInt(tagId))?.name || "";
      setEditedTagName(tagName);
      setModalEdit(tagId);
    }
  };

  const handleSaveEdit = () => {
    console.log("Edited Tag:", editedTagName);
    setModalEdit(null);
  };

  const handleChangeNewTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddNewTag = () => {
    console.log("New tag:", newTag);
    setModalAdd(false);
  };

  const isOneChecked = Object.values(checkedTags).filter(Boolean).length === 1;

  const data = {
    additions: [
      { id: 1, collection: "سرویس آشپزخانه", name: "قاشق و چنگال" },
      { id: 2, collection: "پک لپ‌تاپ", name: "موس" },
      { id: 3, collection: "سرویس ناهارخوری", name: "بشقاب" },
      { id: 4, collection: "ست حمام", name: "حوله" },
      { id: 5, collection: "پک نوشت‌افزار", name: "خودکار" },
      { id: 6, collection: "پک موبایل", name: "هدفون" },
      { id: 7, collection: "سرویس قهوه‌خوری", name: "فنجان" },
      { id: 8, collection: "ست سفر", name: "چمدان" },
      { id: 9, collection: "پک کاردستی", name: "قیچی" },
      { id: 10, collection: "سرویس نظافت", name: "جاروب" },
    ],
    pagination: {
      current_page: 1,
      per_page: 10,
      total_pages: 5,
      total_items: 50,
    },
  };

  const handleRoute = () => router.navigate("add");
  return (
    <div>
      <div className="w-full flex justify-end">
        <h6 className="ml-auto text-xl">افزودنی ها</h6>

        <PrimaryButtons className="mb-4" onClick={handleRoute} >
          <Plus className="w-6 h-6 ml-4" />
          مجموعه افزودنی جدید
        </PrimaryButtons>
      </div>
      <div className="p-4 rounded flex flex-col justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
        <div className="w-80 pb-4">
          <TextField
            id="addressName"
            placeholder="جستجوی مجموعه افزودنی"
            label=""
            onChange={handleChange}
            state={search}
            icon={<Search width={20} height={20} />}
          />
        </div>
        <div>
          {data.additions.map((add) => (
            <div className="flex pb-4" key={add.id}>
              <Checkbox
                checked={!!checkedTags[add.id]}
                onChange={() => handleCheckboxChange(add.id)}
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
              <p className="pr-2">{add.name}</p>
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
          currentPage={data.pagination.current_page}
          onPageChange={(value) => setPage(value)}
          pageSize={data.pagination.total_pages}
          totalCount={data.pagination.total_items}
        />
      </div>

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
          <PrimaryButtons className="max-w-40" onClick={handleSaveEdit}>
            <Plus width={20} height={20} />
            اعمال تغییر
          </PrimaryButtons>
        </div>
      </ModalSKeleton>

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

export default Additions;
