'use client';

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any
}

const uploadPreset = "swnb0zrk";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string[];
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  onRemove,
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  if (!value?.length) {
    return (
      <CldUploadButton
        onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
        }}
      >
        <div
          className={`
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            aspect-4/3
          `}
        >
          <TbPhotoPlus
            size={50}
          />
          <div className={`font-semibold text-lg`}>
            Thêm hình ảnh
          </div>
        </div>
      </CldUploadButton>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {value?.map((item: string, index: number) => {
        return (
          <div key={index} className="flex-shrink-0 w-[120px] h-[90px] relative">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={item}
              alt="House"
            />

            <button onClick={() => onRemove(item)} className="absolute right-1 top-1">
              <AiFillCloseCircle size={20} />
            </button>
          </div>
        )
      })}

      <CldUploadButton
        onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
        }}
      >
        <div
          className={`
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            w-[120px] h-[90px]
          `}
        >
          <TbPhotoPlus size={32} />
        </div>
      </CldUploadButton>
    </div>
  );
}

export default ImageUpload;
