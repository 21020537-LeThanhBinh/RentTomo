'use client'

import Button from "@/components/Button"
import AddressInputPopup from "@/components/input/AddressInputPopup"
import CategoryInput from "@/components/input/CategoryInput"
import ImageUpload from "@/components/input/ImageUpload"
import Input from "@/components/input/Input"
import ItemSelect from "@/components/input/ItemSelect"
import MultiItemSelect from "@/components/input/MultiItemSelect"
import { utilities } from "@/components/input/UtilityInput"
import { IPostForm } from "@/types/postForm"
import formatBigNumber from "@/utils/formatBigNumber"
import handleCloseDialog from "@/utils/handleCloseDialog"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

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
  const MiniMap = useMemo(() => dynamic(() => import("@/components/map/MiniMap"), {
    loading: () => <p>loading...</p>,
    ssr: false
  }), [])

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
          />
        </div>

        <div className="h-[35vh]">
          <MiniMap
            zoom={zoom}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
          />
        </div>
        {values.address.number && (
          <span className='text-neutral-600'>*Vui lòng chọn vị trí thủ công trên bản đồ</span>
        )}

        <div className='font-semibold text-lg text-neutral-600 mt-2'>
          Hình ảnh (3 đến 12 tệp)
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
          Giá thuê và các khoản phí
        </div>

        <Input
          onChange={(value) => setFieldValue("price", parseInt(value.replace(/\D/g, "")))}
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
          required
        />

        <div className='flex gap-2'>
          <Input
            onChange={(value) => setFieldValue("fees.electricity", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(values.fees.electricity)}
            id="electricity"
            label="Điện"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => setFieldValue("fees.water", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(values.fees.water)}
            id="water"
            label="Nước"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => setFieldValue("fees.internet", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(values.fees.internet)}
            id="internet"
            label="Wifi"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />
        </div>

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