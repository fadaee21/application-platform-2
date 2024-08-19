import { useState } from "react";
import Copy from "@/assets/icons/copy.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import Search from "@/assets/icons/search.svg?react";
import Pagination from "@/components/ui-kit/Pagination";
import useSWR from "swr";
import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import { TextField } from "@/components/login/TextField";
import AddTags from "@/components/product/tags/AddTags";
import EditTagModal from "@/components/product/tags/EditTags";
import TagList from "@/components/product/tags/TagList";
const PAGE_SIZE = 20;
interface Tag {
  id: string;
  name: string;
}
const Tags = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(
    `/v1/admins/tag/search?page=${page - 1}&size=${PAGE_SIZE}`
  );

  const [checkedTags, setCheckedTags] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [search, setSearch] = useState<string >("");
  const [modalEdit, setModalEdit] = useState<string | null>(null);
  const [editedTagName, setEditedTagName] = useState<string>("");

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
          (tag: Tag) => tag.id === checkedId
        )?.name || "";
      setEditedTagName(checkedName);
      setModalEdit(checkedId);
    }
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
        <AddTags />
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
        <TagList
          tags={data._embedded.tagSearchResponseList}
          checkedTags={checkedTags}
          onCheckboxChange={handleCheckboxChange}
        />

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
        setCheckedTags={setCheckedTags}
      />
   </div>
  );
};

export default Tags;
