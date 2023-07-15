'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  imageSrcOld: string[];
  setImageSrcOld: React.Dispatch<React.SetStateAction<string[]>>;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageSrcOld, setImageSrcOld, files, setFiles }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previews, setPreviews] = useState<any[]>([])
  const [imageNumber, setImageNumber] = useState<number>(imageSrcOld.length + files.length);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!files.length) {
      return setPreviews([])
    }

    console.log(files)

    const objectUrls = files.map((file) => URL.createObjectURL(file))
    setPreviews(objectUrls)

    // free memory when ever this component is unmounted
    return () => objectUrls.forEach((object) => URL.revokeObjectURL(object))
  }, [files])

  useEffect(() => {
    setImageNumber(imageSrcOld.length + files.length)
  }, [imageSrcOld, files])

  return (
    <div className="flex flex-wrap gap-3">
      {imageSrcOld?.map((item: any, index: number) => {
        return (
          <div key={index} className="flex-shrink-0 w-[120px] h-[90px] relative">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={item}
              alt="Listing picture"
            />

            <button onClick={() => setImageSrcOld(imageSrcOld.filter((_, i) => i != index))} type="button" className="absolute right-1 top-1">
              <AiFillCloseCircle size={20} />
            </button>
          </div>
        )
      })}

      {previews?.map((item: any, index: number) => {
        return (
          <div key={index} className="flex-shrink-0 w-[120px] h-[90px] relative">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={item}
              alt="Listing picture"
            />

            <button onClick={() => setFiles(files.filter((_, i) => i != index))} type="button" className="absolute right-1 top-1">
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
          ${imageNumber ? 'w-[120px] h-[90px]' : 'w-full h-[35vh]'}
        `}
      >
        <TbPhotoPlus size={imageNumber ? 32 : 50} />
        {!imageNumber && (
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
