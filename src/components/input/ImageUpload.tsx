'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = "swnb0zrk";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  small?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  small
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              ${small ? 'p-8' : 'p-20'}
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            `}
          >
            <TbPhotoPlus
              size={small ? 35 : 50}
            />
            <div className={`font-semibold ${small ? 'text-md' : 'text-lg'}`}>
              Thêm hình ảnh
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
