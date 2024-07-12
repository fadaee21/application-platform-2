import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plus from "@/assets/icons/plus.svg?react";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButtons } from "./buttons/PrimaryButtons";
import useAxiosPrivate from "@/hooks/context/useAxiosPrivate";
import { createBannerSchema } from "@/validator/uploadBannerImage";
import { toast } from "react-toastify";
import { LoadingSpinnerButton } from "./LoadingSpinner";

const ALLOWED_WIDTH = 350;
const ImageUploader: React.FC<{
  cb?: () => void;
  bannerId?: string;
  bannerHeight: number;
}> = ({ cb, bannerId, bannerHeight }) => {
  const axiosPrivate = useAxiosPrivate();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) validateAndSetImage(file);
  };
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) validateAndSetImage(file);
    if (ref.current) ref.current.value = "";
  };
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
      cb?.();
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

  const handleImageRemove = () => {
    setPreviewUrl(null);
    setSelectedImage(null);
  };

  return (
    <>
      <div
        className="grid w-full h-full place-items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!previewUrl ? (
          <LinkButton onClick={() => ref.current?.click()}>
            افزودن تصویر
            <Plus width={20} height={20} />
          </LinkButton>
        ) : (
          <img
            src={previewUrl}
            alt="Selected"
            className="object-cover w-full h-24 rounded-t-md place-self-start "
          />
        )}
      </div>
      <input
        type="file"
        ref={ref}
        className="hidden"
        accept="image/*"
        onChange={handleImageSelect}
      />
      {previewUrl && (
        <div className="flex flex-col w-full space-y-2">
          {(selectedImage || uploading) && (
            <PrimaryButtons
              onClick={handleImageUpload}
              disabled={uploading}
              fullWidth
            >
              {uploading ? <LoadingSpinnerButton /> : "بارگذاری"}
            </PrimaryButtons>
          )}
          <PrimaryButtons
            fullWidth
            onClick={handleImageRemove}
            disabled={!selectedImage}
          >
            لغو
          </PrimaryButtons>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
