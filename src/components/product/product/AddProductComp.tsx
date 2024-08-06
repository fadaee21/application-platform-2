import { TextareaField } from "@/components/login/TextareaField";
import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { useState } from "react";
import ImagesInCategory from "../../../components/product/category/ImagesInCategory";
import OutlineButton from "@/components/ui-kit/buttons/OutlineButton";

const AddProductComp = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedOption | null>(null);
  const [selectedTags, setSelectedTags] = useState<SelectedOption | null>(null);
  const [productState, setProductState] = useState({
    name: "",
    price: "",
    discountPercentage: "",
    discountAmount: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    description: "",
    isActive: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggleActive = () => {
    setProductState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  };

  return (
    <div className="p-4 rounded flex flex-col md:flex-row justify-between w-full gap-10">
      <div className="md:w-1/2 w-full">
        <TextField
          label="نام محصول"
          placeholder="نام محصول"
          state={productState.name}
          onChange={handleChange}
          name="name"
          type="text"
          id="name"
        />
        <TextField
          label="قیمت محصول (تومان)"
          placeholder="قیمت محصول"
          state={productState.price}
          onChange={handleChange}
          name="price"
          type="text"
          id="price"
        />
        <TextField
          label="تخفیف (درصد)"
          placeholder="تخفیف به صورت درصد"
          state={productState.discountPercentage}
          onChange={handleChange}
          name="discountPercentage"
          type="text"
          id="discountPercentage"
        />
        <TextField
          label="تخفیف (مبلغ ثابت - تومان)"
          placeholder="تخفیف به صورت مبلغ ثابت"
          state={productState.discountAmount}
          onChange={handleChange}
          name="discountAmount"
          type="text"
          id="discountAmount"
        />
        <ListBoxSelect
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          items={[{ label: "دسته 1", value: "1" }]} // Replace with actual category options
          label="انتخاب دسته‌بندی"
        />
        <ListBoxSelect
          selected={selectedTags}
          setSelected={setSelectedTags}
          items={[{ label: "برچسب 1", value: "1" }]} // Replace with actual tag options
          label="انتخاب برچسب‌ها"
          // multiple
        />
        <TextareaField
          label="توضیحات"
          placeholder="توضیحات محصول"
          state={productState.description}
          onChange={handleChange}
          name="description"
          id="description"
          height="150px"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col items-center">
        <OutlineButton onClick={handleToggleActive} fullWidth className="mt-4">
          {productState.isActive ? "غیرفعال کردن محصول" : "فعال کردن محصول"}
        </OutlineButton>

        <TextField
          label="طول (cm)"
          placeholder="طول"
          state={productState.length}
          onChange={handleChange}
          name="length"
          type="text"
          id="length"
        />
        <TextField
          label="عرض (cm)"
          placeholder="عرض"
          state={productState.width}
          onChange={handleChange}
          name="width"
          type="text"
          id="width"
        />
        <TextField
          label="ارتفاع (cm)"
          placeholder="ارتفاع"
          state={productState.height}
          onChange={handleChange}
          name="height"
          type="text"
          id="height"
        />
        <TextField
          label="وزن (g)"
          placeholder="وزن"
          state={productState.weight}
          onChange={handleChange}
          name="weight"
          type="text"
          id="weight"
        />
        <ImagesInCategory
          bannerId=""
          height={100}
          heightBanner="h-82"
          widthBanner="md:max-w-[350px] w-full" // it must be compatible with ALLOWED_WIDTH
          mutate={() => {}} // just send mutate
          idx={0}
        />
      </div>
    </div>
  );
};

export default AddProductComp;
