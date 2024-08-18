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
  { value: "4", label: "ثبت نام شده" },
  { value: "1", label: "ثبت نام نشده" },
  { value: "2", label: "عدم تطبیق موبایل و کد ملی" },
  { value: "3", label: "عدم احراز ثبت احوال" },
];


//(0),
//UNREGISTERED(1),
//NOT_MATCH_MOBILE_NATIONAL_CODE(2),
//NOT_AUTHORIZED_BY_REGISTER_OFFICE(3),
//REGISTERED(4),
//DISABLED(5);