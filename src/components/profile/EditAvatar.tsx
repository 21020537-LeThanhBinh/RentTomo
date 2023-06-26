import { AiFillCamera } from "react-icons/ai";
import Avatar from "./Avatar";
import { useEffect, useRef, useState } from "react";

export default function EditAvatar({ new_avatar_url, selectedFile, setSelectedFile }: { new_avatar_url?: string, selectedFile?: any, setSelectedFile?: any }) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<any>()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <>
      <button onClick={() => imgInputRef.current?.click()} className="relative">
        <Avatar src={preview || new_avatar_url} size={90} />
        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white hover:bg-neutral-100 transition">
          <AiFillCamera size={20} className="fill-neutral-800" />
        </div>
      </button>

      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        hidden
      />
    </>
  )
}