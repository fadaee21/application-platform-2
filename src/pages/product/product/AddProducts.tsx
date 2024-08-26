import AddProductComp from "@/components/product/product/addProduct/AddProductComp";
import OutlineButton from "@/components/ui-kit/buttons/OutlineButton";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import useFetcherPost from "@/hooks/useFetcherPost";
import router from "@/routes";
import handleError from "@/validator/showError";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

const AddProducts = () => {
  const [productState, setProductState] = useState({
    name: "",
    price: "",
    discountPrice: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    description: "",
    isActive: 0,
  }); //also handle tag id and category id
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggleActive = () => {
    setProductState({
      ...productState,
      isActive: productState.isActive === 0 ? 1 : 0,
    });
  };

  const [discountType, setDiscountType] = useState(0);
  const [selectedTags, setSelectedTags] = useState<SelectedOption[] | null>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedOption | null>(null);
  const toggleDiscountType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setDiscountType((prevState) => (prevState === 0 ? 1 : 0));
  };
  const tagIds = selectedTags?.map((tag) => tag.value).join(",");
  const url = `/v1/admins/product?name=${productState.name}&description=${productState.description}&price=${productState.price}&discountPrice=${productState.discountPrice}&discountType=${discountType}&length=${productState.length}&width=${productState.width}&height=${productState.height}&weight=${productState.weight}&status=${productState.isActive}&count=0&thresholdCount=0&categoryId=${selectedCategory?.value}&tagIds=${tagIds}&thresholdAlert=true&visibility=true`;
  // const url =`/v1/admins/product?name=نام محصول&description=testetstestest&price=154874&discountPrice=20&discountType=0&length=100&width=100&height=100&weight=100&status=1&count=0&thresholdCount=0&categoryId=9530ba1c-52fd-4e27-8835-504913f992e6&tagIds=27243132-fcd8-4c49-a403-9f1669e3afc7`
  const fetcherPost = useFetcherPost({
    headers: { "Content-Type": "multipart/form-data" },
  });

  const { trigger, isMutating } = useSWRMutation(
    url,
    fetcherPost<FormData, { id: string }>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ selectedImages });
    try {
      if (selectedImages.length > 0) {
        const formData = new FormData();
        formData.append("images", selectedImages[0]);
        const res = await trigger(formData);
        if (res.id) {
          toast.success("محصول با موفقیت اضافه شد");
          router.navigate("/superuser/product");
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const isDisableSubmit =
    Object.values(productState).some((value) => value === "") ||
    selectedImages.length === 0 ||
    selectedTags?.length === 0 ||
    selectedCategory === null;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="w-full flex gap-4 items-center justify-start">
          <h6 className="ml-auto text-xl">اضافه کردن محصول جدید</h6>
          <OutlineButton
            type="reset"
            onClick={() => router.navigate("/superuser/product")}
          >
            انصراف
          </OutlineButton>
          <PrimaryButtons type="submit" disabled={isDisableSubmit}>
            {isMutating ? <LoadingSpinnerButton /> : "ذخیره"}
          </PrimaryButtons>
        </div>
        <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
          <AddProductComp
            productState={productState}
            handleChange={handleChange}
            setSelectedImages={setSelectedImages}
            selectedImages={selectedImages}
            toggleDiscountType={toggleDiscountType}
            discountType={discountType}
            handleToggleActive={handleToggleActive}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
