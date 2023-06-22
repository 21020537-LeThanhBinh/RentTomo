'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({files, setFiles}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previews, setPreviews] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!files.length) {
      setPreviews([])
      return
    }

    const objectUrls = files.map((file) => URL.createObjectURL(file))
    setPreviews(objectUrls)

    // free memory when ever this component is unmounted
    return () => objectUrls.forEach((object) => URL.revokeObjectURL(object))
  }, [files])

  return (
    <div className="flex flex-wrap gap-3">
      {previews?.map((item: any, index: number) => {
        return (
          <div key={index} className="flex-shrink-0 w-[120px] h-[90px] relative">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={item}
              alt="Listing picture"
            />

            <button onClick={() => setFiles(files.filter((file) => file != item))} type="button" className="absolute right-1 top-1">
              <AiFillCloseCircle size={20} />
            </button>
          </div>
        )
      })}

      <div
        onClick={() => inputRef.current?.click()}
        className={`
          relative
          transition
          border-dashed border-2 border-neutral-300
          flex flex-col justify-center items-center gap-4
          text-neutral-600
          ${!isLoading && 'cursor-pointer hover:opacity-70'}
          ${files.length ? 'w-[120px] h-[90px]' : 'aspect-4/3 w-full'}
        `}
      >
        <TbPhotoPlus size={files.length ? 32 : 50} />
        {!files.length && (
          <div className={`font-semibold text-lg`}>
            Thêm hình ảnh
          </div>
        )}
      </div>

      <input
        type="file"
        name="files"
        id="files"
        accept="image/*"
        onChange={(event: any) => setFiles([...files, ...event.target.files])}
        ref={inputRef}
        multiple
        hidden
      />
    </div>
  );
}

export default ImageUpload;
