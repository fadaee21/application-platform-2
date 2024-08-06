import React, { useRef } from "react";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plus from "@/assets/icons/plus.svg?react";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButtons } from "./buttons/PrimaryButtons";

import { LoadingSpinnerButton } from "./LoadingSpinner";

const ImageUploader: React.FC<{
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  selectedImage: File | null;
  uploading: boolean;
  handleImageUpload: () => Promise<void>;
  validateAndSetImage: (file: File) => void;
}> = ({
  setPreviewUrl,
  setSelectedImage,
  previewUrl,
  selectedImage,
  uploading,
  handleImageUpload,
  validateAndSetImage,
}) => {
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
