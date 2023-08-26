'use client'

import Button from "@/components/buttons/Button"
import CategoryInput from "@/components/input/CategoryInput"
import ImageUpload from "@/components/input/ImageUpload"
import Input from "@/components/input/Input"
import ItemSelect from "@/components/input/ItemSelect"
import MultiItemSelect from "@/components/input/MultiItemSelect"
import OtherFeesInput from "@/components/input/OtherFeesInput"
import { utilities } from "@/components/input/UtilityInput"
import { IPostForm } from "@/types/postForm"
import formatBigNumber from "@/utils/formatBigNumber"
import handleCloseDialog from "@/utils/handleCloseDialog"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
const AddressInputPopup = dynamic(() => import('@/components/input/AddressInputPopup'))
const MiniMap = dynamic(() => import("@/components/map/MiniMap"), {
  loading: () => <p>Đang tải bản đồ ...</p>,
  ssr: false
})

export default function PostForm({
  isLoading,
  handleSubmit,
  values,
  setFieldValue,
  addressLabel,
  setAddressLabel,
  selectedPoint,
  setSelectedPoint,
  imageSrcOld,
  setImageSrcOld,
  files,
  setFiles,
  isEditPost
}: {
  isLoading: boolean,
  handleSubmit: () => void
  values: IPostForm
  setFieldValue: (name: string, value: any) => void
  addressLabel: string
  setAddressLabel: (label: string) => void
  selectedPoint: { lat: number, lng: number }
  setSelectedPoint: (point: { lat: number, lng: number }) => void
  imageSrcOld: string[]
  setImageSrcOld: React.Dispatch<React.SetStateAction<string[]>>
  files: any[]
  setFiles: React.Dispatch<React.SetStateAction<any[]>>
  isEditPost?: boolean
}) {
  const router = useRouter()
  const addressRef = useRef<HTMLDialogElement>(null)
  const [zoom, setZoom] = useState<number>(isEditPost ? 5 : 15)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, addressRef.current!, () => addressRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditPost) return

    const newZoom = values.address.ward_id ? 15 : values.address.district_id ? 13 : values.address.city_id ? 9 : 5
    setZoom(newZoom)
  }, [isEditPost, values.address.ward_id, values.address.district_id, values.address.city_id])

  return (
    <form className="my-6 rounded-2xl border-2 flex flex-col md:flex-row gap-6 p-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 md:w-1/3 w-full relative">
        <div className='font-semibold text-lg text-neutral-600'>
          Địa chỉ
        </div>

        <div>
          <div onClick={() => !addressRef.current?.open && addressRef.current?.showModal()}>
            <ItemSelect
              onChange={() => !addressRef.current?.open && addressRef.current?.showModal()}
              value={{ label: addressLabel }}
              placeholder="Địa chỉ"
              isClearable={false}
              alwaysClosed={true}
              tabIndex={-1}
              required
            />
          </div>

          <AddressInputPopup
            value={values.address}
            setFieldValue={(name, value) => setFieldValue(name, value)}
            isLoading={isLoading}
            addressRef={addressRef}
            setAddressLabel={setAddressLabel}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
          />
        </div>

        <div className="h-[35vh]">
          <MiniMap
            zoom={zoom}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
          />
        </div>
        {values.address.street && (
          <span className='text-neutral-600'>* Vui lòng chọn vị trí thủ công bằng cách di chuyển bản đồ</span>
        )}

        <div className='font-semibold text-lg text-neutral-600 mt-2'>
          Hình ảnh (1 đến 12 tệp)
        </div>

        <ImageUpload
          imageSrcOld={imageSrcOld}
          setImageSrcOld={setImageSrcOld}
          files={files}
          setFiles={setFiles}
        />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className='font-semibold text-lg text-neutral-600'>
          Thông tin chung
        </div>

        <CategoryInput
          onChange={(value) => setFieldValue("category", value)}
          value={values.category}
        />

        <MultiItemSelect
          placeholder="Thêm tiện ích"
          options={utilities.map((utility: any) => {
            return { value: utility.label, label: utility.label, icon: utility.icon }
          })}
          value={values.utility.map((utility: string) => { return { value: utility, label: utility, icon: undefined } })}
          onChange={(utility: any) => {
            setFieldValue("utility", utility.map((item: any) => item.value))
          }}
          hasSelectAll
        />

        <Input
          onChange={(value) => setFieldValue("area", value)}
          value={values.area ? values.area.toString() : ""}
          id="area"
          label="Diện tích (m²)"
          disabled={isLoading}
          required
        />

        <div className='font-semibold text-lg text-neutral-600 mt-2'>
          Giá thuê và các phí khác
        </div>

        <Input
          onChange={(value) => setFieldValue("price", parseInt(value.replace(/\D/g, "")))}
          onBlur={(e) => e.target.value && setFieldValue("fees.deposit", parseInt(e.target.value.replace(/\D/g, "")))}
          value={formatBigNumber(values.price)}
          id="price"
          label="Giá thuê"
          formatPrice
          type="string"
          disabled={isLoading}
          required
        />

        <Input
          onChange={(value) => setFieldValue("fees.deposit", parseInt(value.replace(/\D/g, "")))}
          value={formatBigNumber(values.fees.deposit)}
          id="deposit"
          label="Tiền cọc"
          formatPrice
          type="string"
          disabled={isLoading}
        />

        <OtherFeesInput
          values={values}
          setFieldValue={setFieldValue}
          isLoading={isLoading}
        />

        <div className='font-semibold text-lg text-neutral-600 mt-2'>
          Nội dung tin đăng
        </div>

        <Input
          onChange={(value) => setFieldValue("title", value)}
          value={values.title}
          id="title"
          label="Tiêu đề"
          disabled={isLoading}
          required
        />

        <Input
          onChange={(value) => setFieldValue("description", value)}
          value={values.description}
          id="description"
          label="Mô tả chi tiết"
          disabled={isLoading}
          required
          multiline
        />

        <div className="flex justify-end mt-2">
          <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
            <Button
              label='Hủy'
              onClick={() => router.back()}
              disabled={isLoading}
              outline
            />
            <Button
              label={isEditPost ? 'Cập nhật' : 'Đăng tin'}
              onClick={() => { }}
              disabled={isLoading}
              type='submit'
            />
          </div>
        </div>
      </div>
    </form >
  )
}