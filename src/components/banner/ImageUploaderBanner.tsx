import React, { useState } from "react";
import ImageUploader from "../ui-kit/ImageUploader";
import { createBannerSchema } from "@/validator/uploadBannerImage";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import { toast } from "react-toastify";
const ALLOWED_WIDTH = 350;

const ImageUploaderBanner: React.FC<{
  callBackFunc?: () => void;
  bannerId?: string;
  bannerHeight: number;
}> = ({ callBackFunc, bannerId, bannerHeight }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const axiosPrivate = useAxiosPrivate();

  const validateAndSetImage = (file: File) => {
    const bannerSchema = createBannerSchema(bannerHeight, ALLOWED_WIDTH);
    const previewUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const imageValidation = bannerSchema.safeParse({
        size: file.size,
        type: file.type,
        height: img.height,
        width: img.width,
      });
      if (!imageValidation.success) {
        const errors = imageValidation.error.errors
          .map((error) => error.message)
          .join(", ");
        console.log(errors);
        toast.error(errors);
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    };
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const bodyContent = new FormData();
    bodyContent.append("file", selectedImage);
    setUploading(true);
    try {
      await axiosPrivate.post(
        `/panel/banner/add/image/${bannerId}`,
        bodyContent,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      callBackFunc?.();
      toast.success("عکس با موفقیت آپلود شد");
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ImageUploader
      validateAndSetImage={validateAndSetImage}
      handleImageUpload={handleImageUpload}
      setPreviewUrl={setPreviewUrl}
      setSelectedImage={setSelectedImage}
      previewUrl={previewUrl}
      selectedImage={selectedImage}
      uploading={uploading}
    />
  );
};

export default ImageUploaderBanner;
