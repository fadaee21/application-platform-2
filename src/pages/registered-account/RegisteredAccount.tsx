import ModalSheba from "@/components/registered-accounts/ModalSheba";
import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";
import ModalSKeleton from "@/components/ui-kit/ModalSkeleton";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const RegisteredAccount = () => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(
    options[0]
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const closeModal = () =>
    setSearchParams((prevParams) => {
      const updatedSearchParams = new URLSearchParams(prevParams);
      updatedSearchParams.delete("showModal");
      updatedSearchParams.delete("id");
      return updatedSearchParams;
    });

  return (
    <>
      <div className="flex flex-col">
        <div className="max-w-md mb-10 flex justify-start items-center">
          <ListBoxSelect
            items={options}
            selected={selectedOption}
            setSelected={setSelectedOption}
            label="وضعیت"
          />
        </div>

        <TableContentAccounts selectedOption={selectedOption} />
      </div>
      <ModalSKeleton
        title="لیست شبا"
        closeModal={closeModal}
        isShow={searchParams.get("showModal") === "true"}
      >
        <ModalSheba />
      </ModalSKeleton>
    </>
  );
};

export default RegisteredAccount;

const options = [
  { value: "registered", label: "ثبت نام شده" },
  { value: "unregistered", label: "ثبت نام نشده" },
  { value: "unmatched/mobile", label: "عدم تطبیق موبایل و کد ملی" },
  { value: "unmatched/birthDate", label: "عدم احراز ثبت احوال" },
];

// const header: { [key: string]: string } = {
//   registered: "کاربرانی که ثبت نام کرده‌اند",
//   unregistered: "کاربرانی که هنوز ثبت نام نکرده‌اند",
//   "unmatched/mobile": "کاربرانی که موبایل و کد ملی آن‌ها تطابق ندارد",
//   "unmatched/birthDate":
//     "کاربرانی که تاریخ تولد آن‌ها با اطلاعات ثبت احوال تطابق ندارد",
// };
