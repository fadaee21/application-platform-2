import { TextareaField } from "@/components/login/TextareaField";
import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { useState } from "react";
import ImagesInCategory from "../../../components/product/category/ImagesInCategory";

const AddCategory = () => {
  const [selectTags, setSelectTags] = useState<SelectedOption | null>(null);

  const [categoryState, setCategoryState] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategoryState({
      ...categoryState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
      <div className="md:w-1/2 w-full">
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
        <TextareaField
          label="توضیحات دسته بندی"
          placeholder="توضیحات دسته بندی"
          state={categoryState.description}
          onChange={handleChange}
          name="description"
          id="description"
          height="150px"
        />
      </div>
      <ImagesInCategory
        bannerId=""
        height={100}
        heightBanner="h-82"
        widthBanner="md:max-w-[350px] w-full" //it must be compatible with ALLOWED_WIDTH
        mutate={() => {}} // just sent mutate
        idx={0}
      />
    </div>
  );
};

export default AddCategory;
