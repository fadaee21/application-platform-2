import { useState } from "react";
import useSWR, { mutate } from "swr";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";
import axiosInstance from "@/services/axios";

const FieldSettingComp = () => {
  const { isLoading: fieldConfigLoading } = useSWR<
    ResponseDataNoPagination<IFieldConfig>
  >("/panel/options/account_fields", {
    onSuccess(data) {
      setFieldState(data.body);
    },
    onError(error) {
      console.log(error);
    },
  });
  const [fieldState, setFieldState] = useState<IFieldConfig[] | undefined>();
  const updateFieldConfig = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: IFieldConfig
  ) => {
    console.log(field);
    const { available, mandatory, readOnly, fieldName } = field;
    const { name, checked } = e.target;
    setFieldState((prev) =>
      prev?.map((item) =>
        item.fieldName === fieldName
          ? {
              ...item,
              [name]: checked,
            }
          : item
      )
    );
    try {
      const res = await axiosInstance.put(
        `/panel/options/account_fields/${fieldName}`,
        { available, mandatory, readOnly, [name]: checked }
      );
      if (res.status === 200) {
        await mutate("/panel/options/account_fields", fieldState);
      } else {
        console.log({ res });
        //TODO show error
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (fieldConfigLoading) return <LoadingSpinnerTable />;

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="mt-2 font-extrabold text-gray-600 dark:text-slate-300">
          تنظیمات فیلدهای ثبت‌نام
        </p>
        {/* <div className="w-content">
          <PrimaryButtons>ثبت تغیرات</PrimaryButtons>
        </div> */}
      </div>

      <div className="flex items-center justify-between">
        <table className="w-full mt-4 text-center border-collapse">
          <thead>
            <tr className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 dark:text-slate-300 ">
              <th className="pb-4">نام فیلد</th>
              <th className="pb-4">فقط خواندنی</th>
              <th className="pb-4">الزامی</th>
              <th className="pb-4">موجود</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700 dark:text-slate-300">
            {fieldState?.map((field, index) => (
              <tr key={index} className="grid grid-cols-4 gap-4 border-t">
                <td className="py-4">{field.fieldName}</td>
                <td className="py-4 ">
                  <input
                    type="checkbox"
                    name="readOnly"
                    checked={field.readOnly}
                    onChange={(e) => updateFieldConfig(e, field)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="py-4 ">
                  <input
                    type="checkbox"
                    name="mandatory"
                    checked={field.mandatory}
                    onChange={(e) => updateFieldConfig(e, field)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="py-4 ">
                  <input
                    type="checkbox"
                    name="available"
                    checked={field.available}
                    onChange={(e) => updateFieldConfig(e, field)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FieldSettingComp;
