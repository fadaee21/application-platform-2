import React, { useRef } from "react";
import Plus from "@/assets/icons/plus.svg?react";
import XMark from "@/assets/icons/x-mark.svg?react"; // Assuming you have a cross icon SVG
import { LinkButton } from "./buttons/LinkButton";

const ImageUploaderNoUploading: React.FC<{
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  previewUrls: string[];
  selectedImages: File[];
  validateAndSetImage: (file: File) => void;
}> = ({
  setPreviewUrls,
  setSelectedImages,
  previewUrls,
  // selectedImages,
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

  const handleImageRemove = (index: number) => {
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        className="grid w-full h-full place-items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrls.length === 0 ? (
          <LinkButton
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              ref.current?.click();
            }}
          >
            افزودن تصویر
            <Plus width={20} height={20} />
          </LinkButton>
        ) : (
          previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative rounded-md overflow-hidden ring-2 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-400 dark:focus:ring-indigo-500"
            >
              <img
                src={url}
                alt={`Selected ${index}`}
                className="object-cover w-full"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute cursor-pointer top-2 right-2 text-slate-100 bg-slate-500/50 hover:bg-slate-500 rounded-full p-0"
              >
                <XMark />
              </button>
            </div>
          ))
        )}
      </div>
      <input
        type="file"
        ref={ref}
        className="hidden"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </>
  );
};

export default ImageUploaderNoUploading;