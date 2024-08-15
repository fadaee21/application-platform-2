import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Plus from "@/assets/icons/plus.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import { TextField } from "@/components/login/TextField";
import { useState } from "react";
import Search from "@/assets/icons/search.svg?react";
import Pagination from "@/components/ui-kit/Pagination";
import { Checkbox } from "@headlessui/react";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import useSWR from "swr";
import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";

const PAGE_SIZE = 20;
const Tags = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(
    `/v1/admins/tag/search?page=${page - 1}&size=${PAGE_SIZE}`
  );

  const [search, setSearch] = useState("");
  const [checkedTags, setCheckedTags] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [modalEdit, setModalEdit] = useState<boolean>(false);

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
    // Count the number of checked checkboxes
    const checkedCount = Object.values(checkedTags).filter(Boolean).length;

    if (checkedCount === 1) {
      setModalEdit(true);
    } else {
      // Optionally, provide feedback if needed
      console.log("Please select exactly one checkbox.");
    }
  };

  // Determine if exactly one checkbox is checked
  const isOneChecked = Object.values(checkedTags).filter(Boolean).length === 1;

  const dataMock = {
    tags: [
      { id: 1, name: "electronics" },
      { id: 2, name: "computers" },
      { id: 3, name: "gadgets" },
      { id: 4, name: "phones" },
      { id: 5, name: "sports" },
      { id: 6, name: "footwear" },
      { id: 7, name: "fitness" },
      { id: 8, name: "home_appliances" },
      { id: 9, name: "kitchen" },
      { id: 10, name: "beverages" },
    ],
    pagination: {
      current_page: 1,
      per_page: 10,
      total_pages: 5,
      total_items: 50,
    },
  };

  if (isLoading) {
    return <LoadingSpinnerPage />;
  }

  return (
    <div>
      <PrimaryButtons>
        <Plus width={20} height={20} />
        برچسب جدید
      </PrimaryButtons>
      <div className="flex flex-col m-5 px-10 py-28 rounded shadow-md bg-slate-50 dark:bg-slate-700">
        <div className="w-80 pb-4">
          <TextField
            id="addressName"
            placeholder="جستجوی برچسب"
            label=""
            onChange={handleChange}
            state={search}
            icon={<Search width={20} height={20} />}
          />
        </div>
        <div>
          {dataMock.tags.map((tag) => (
            <div className="flex pb-4" key={tag.id}>
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
            className={`mx-2 cursor-pointer ${
              isOneChecked ? "" : "cursor-default opacity-50"
            }`}
            onClick={isOneChecked ? handleEditClick : undefined}
          />
          <Copy
            width={30}
            height={30}
            className="mx-2 cursor-pointer"
            onClick={() => console.log("copy")}
          />
        </div>
        <Pagination
          currentPage={dataMock.pagination.current_page}
          onPageChange={(value) => setPage(value)}
          pageSize={dataMock.pagination.total_pages}
          totalCount={dataMock.pagination.total_items}
        />
      </div>
      {modalEdit && (
        <ModalSKeleton
          title="EDIT"
          closeModal={() => setModalEdit(false)}
          isShow={modalEdit}
        >
          modal
        </ModalSKeleton>
      )}
    </div>
  );
};

export default Tags;
