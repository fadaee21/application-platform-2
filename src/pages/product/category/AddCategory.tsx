import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { useState } from "react";

const AddCategory = () => {
  const [selectTags, setSelectTags] = useState<SelectedOption | null>(null);

  const [categoryState, setCategoryState] = useState({
    title: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryState({
      ...categoryState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="p-4 rounded shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
      <TextField
        label="عنوان دسته بندی"
        placeholder="عنوان دسته بندی"
        state={categoryState.title}
        onChange={handleChange}
        name="title"
        type="text"
        id="title"
      />
      <ListBoxSelect
        selected={selectTags}
        setSelected={setSelectTags}
        items={[{ label: "دسته 1", value: "1" }]}
        label="انتخاب برچسب"
      />
    </div>
  );
};

export default AddCategory;
