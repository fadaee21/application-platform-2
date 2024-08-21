import { TextareaField } from "@/components/login/TextareaField";
import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import MySwitch from "@/components/ui-kit/MySwitch";
import ImageUploaderProduct from "./ImageUploaderProduct";
import Badge from "@/components/ui-kit/Badge";
import useSWR from "swr";
import ListBoxSelectMultiple from "@/components/ui-kit/select-box/ListBoxSelectMultiple";
import useFetcherPost from "@/hooks/useFetcherPost";

type ProductState = {
  name: string;
  price: string;
  discountPrice: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  description: string;
  isActive: number;
};

interface IProps {
  productState: ProductState;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  selectedImages: File[];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  toggleDiscountType: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleToggleActive: () => void;
  discountType: number;
  selectedCategory: SelectedOption | null;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<SelectedOption | null>
  >;
  selectedTags: SelectedOption[] | null;
  setSelectedTags: React.Dispatch<
    React.SetStateAction<SelectedOption[] | null>
  >;
}

const AddProductComp = ({
  productState,
  setSelectedImages,
  selectedImages,
  handleChange,
  toggleDiscountType,
  discountType,
  handleToggleActive,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
}: IProps) => {
  const { data: TagData, isLoading: TagIsLoading } = useSWR<
    RootResponseNew<ITagSearchResponseList>
  >(`/v1/admins/tag/search?page=0&size=100`);

  const fetcherPost = useFetcherPost();
  const fetchUrl = "/v1/admins/category/search?page=0&size=100";

  const { data: categoryData, isLoading: categoryIsLoading } = useSWR<
    RootResponseNew<ICategorySearchResponseList>
  >(fetchUrl, {
    // suspense: true,
    fetcher: () =>
      fetcherPost<object, RootResponseNew<ICategorySearchResponseList>>(
        fetchUrl,
        {
          arg: {},
        }
      ),
  });

  return (
    <div className="p-4 rounded flex flex-col md:flex-row justify-between w-full gap-10">
      <div className="md:w-1/2 w-full">
        <div className="mb-4 w-full">
          <TextField
            label="نام محصول"
            placeholder="نام محصول"
            state={productState.name}
            onChange={handleChange}
            name="name"
            type="text"
            id="name"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="قیمت محصول (تومان)"
            placeholder="قیمت محصول"
            state={productState.price}
            onChange={handleChange}
            name="price"
            type="text"
            id="price"
          />
        </div>

        <div className="mb-4 w-full">
          <TextField
            label={
              discountType === 0 ? "تخفیف (درصد)" : "تخفیف (مبلغ ثابت - تومان)"
            }
            placeholder={
              discountType === 0 ? "تخفیف به صورت درصد" : "تخفیف به مبلغ ثابت"
            }
            state={productState.discountPrice}
            onChange={handleChange}
            name="discountPrice"
            type="text"
            id="discountPrice"
            comp={
              <div className=" absolute  bottom-1.5 left-1.5 flex gap-2 items-center  ">
                <button onClick={toggleDiscountType}>
                  <Badge
                    color={discountType === 1 ? "gray" : "green"}
                    text="درصد"
                  />
                </button>
                <button onClick={toggleDiscountType}>
                  <Badge
                    color={discountType === 0 ? "gray" : "green"}
                    text="مبلغ ثابت"
                  />
                </button>
              </div>
            }
          />
        </div>
        <div className="mb-4 w-full">
          {categoryIsLoading || !categoryData ? (
            <ListBoxSelect
              label="انتخاب دسته‌بندی"
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              items={[]}
            />
          ) : (
            <ListBoxSelect
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              items={categoryData?._embedded?.categorySearchResponseList.map(
                (i) => ({ label: i.name, value: i.id })
              )} // Replace with actual category options
              label="انتخاب دسته‌بندی"
            />
          )}
        </div>
        <div className="mb-4 w-full">
          {TagIsLoading || !TagData ? (
            <ListBoxSelectMultiple
              items={[]}
              selected={selectedTags}
              setSelected={setSelectedTags}
              label="انتخاب برچسب‌ها"
            />
          ) : (
            <ListBoxSelectMultiple
              items={
                TagData?._embedded?.tagSearchResponseList.map((i) => ({
                  label: i.name,
                  value: i.id,
                })) || []
              }
              selected={selectedTags}
              setSelected={setSelectedTags}
              label="انتخاب برچسب‌ها"
            />
          )}
        </div>
        <div className="mb-4 w-full">
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
      </div>
      <div className="md:w-1/2 w-full flex flex-col items-center">
        {/* <OutlineButton onClick={handleToggleActive} fullWidth className="mt-4">
          {productState.isActive ? "غیرفعال کردن محصول" : "فعال کردن محصول"}
        </OutlineButton> */}
        <div className="mb-4 w-full pr-2 py-4 mt-4   rounded-md border-0  block shadow-sm ring-1 ring-inset placeholder:text-gray-400 text-sm leading-6 pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-slate-300 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset  focus:ring-indigo-400 dark:focus:ring-indigo-500">
          <MySwitch
            checked={productState.isActive === 1}
            onChange={handleToggleActive}
            label={productState.isActive ? "فعال" : "غیرفعال"}
            noSpace
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="طول (cm)"
            placeholder="طول"
            state={productState.length}
            onChange={handleChange}
            name="length"
            type="text"
            id="length"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="عرض (cm)"
            placeholder="عرض"
            state={productState.width}
            onChange={handleChange}
            name="width"
            type="text"
            id="width"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="ارتفاع (cm)"
            placeholder="ارتفاع"
            state={productState.height}
            onChange={handleChange}
            name="height"
            type="text"
            id="height"
          />
        </div>
        <div className="mb-16 w-full">
          <TextField
            label="وزن (g)"
            placeholder="وزن"
            state={productState.weight}
            onChange={handleChange}
            name="weight"
            type="text"
            id="weight"
          />
        </div>
        <div className="mb-4 w-full flex justify-center">
          <ImageUploaderProduct
            bannerHeight={100}
            setSelectedImages={setSelectedImages}
            selectedImages={selectedImages}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductComp;
