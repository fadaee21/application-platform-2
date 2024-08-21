import ImageUploaderNoUploading from "@/components/ui-kit/ImageUploaderNoUploading";
import React, { useState } from "react";
// import { createBannerSchema } from "@/validator/uploadBannerImage";
// import { toast } from "react-toastify";

// const ALLOWED_WIDTH = 350; //it must be compatible with widthBanner

const ImageUploaderProduct: React.FC<{
  bannerHeight: number;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  selectedImages: File[];
}> = ({ bannerHeight, setSelectedImages, selectedImages }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  console.log({ bannerHeight });
  const validateAndSetImage = (file: File) => {
    // const categorySchema = createBannerSchema(bannerHeight, ALLOWED_WIDTH); //it must change the createCategorySchema
    const previewUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      // const imageValidation = categorySchema.safeParse({
      //   size: file.size,
      //   type: file.type,
      //   height: img.height,
      //   width: img.width,
      // });
      // if (!imageValidation.success) {
      //   const errors = imageValidation.error.errors
      //     .map((error) => error.message)
      //     .join(", ");
      //   console.log(errors);
      //   toast.error(errors);
      //   return;
      // }

      setSelectedImages((prevImages) => [...prevImages, file]);
      setPreviewUrls((prevUrls) => [...prevUrls, previewUrl]);
      return () => URL.revokeObjectURL(previewUrl);
    };
  };

  return (
    <ImageUploaderNoUploading
      validateAndSetImage={validateAndSetImage}
      setPreviewUrls={setPreviewUrls}
      setSelectedImages={setSelectedImages}
      previewUrls={previewUrls}
      selectedImages={selectedImages}
    />
  );
};

export default ImageUploaderProduct;
