'use client'

import { createQueryString } from "@/utils/queryString"
import handleCloseDialog from "@/utils/handleCloseDialog"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import ReactSlider from 'react-slider'
import Button from "../Button"
import { categoryOptions } from "../input/CategoryInput"
import ItemSelect from "../input/ItemSelect"
import MultiItemSelect from "../input/MultiItemSelect"
import PopupInputContainer from "../input/PopupInputContainer"
import { utilities } from "../input/UtilityInput"
import CategorySelect from "./CategorySelect"
import Input from "../input/Input"
import { BsDashLg } from "react-icons/bs"
import { ISearchParams } from "@/types"

export default function FilterBar({ searchParams, children }: { searchParams: ISearchParams, children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const [category, setCategory] = useState<string[]>(categoryOptions.map((option) => option.value))

  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(15)

  const [minArea, setMinArea] = useState<number>(0)
  const [maxArea, setMaxArea] = useState<number>(150)

  const [utility, setUtility] = useState<string[]>([])

  const [isMale, setIsMale] = useState<boolean | undefined>()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, dialogRef.current!, () => dialogRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onApply = async () => {
    setIsLoading(true);

    router.push(pathname + '?'
      + ((category.length < 4) ? createQueryString(searchParams, 'category', category) : createQueryString(searchParams, 'category', ''))
      + '&' + createQueryString(searchParams, 'minPrice', minPrice)
      + '&' + createQueryString(searchParams, 'maxPrice', maxPrice)
      + '&' + createQueryString(searchParams, 'minArea', minArea)
      + '&' + createQueryString(searchParams, 'maxArea', maxArea)
      + '&' + createQueryString(searchParams, 'utility', utility)
      + '&' + createQueryString(searchParams, 'isMale', isMale)
    )

    setIsLoading(false)
    dialogRef.current?.close()
  }

  return (
    <>
      <div onClick={() => !dialogRef.current?.open && dialogRef.current?.showModal()} className="p-6 border-[1px] rounded-xl relative cursor-pointer">
        {children}
      </div>

      <dialog ref={dialogRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%]'>
        <PopupInputContainer
          label="Bộ lọc"
          onBack={() => dialogRef.current?.close()}
          className="flex flex-col gap-4"
        >
          <div className="text-lg text-neutral-600">
            Loại phòng:
          </div>
          <CategorySelect
            category={category}
            setCategory={setCategory}
          />

          <div className="text-lg text-neutral-600">
            Tầm giá:
          </div>
          <ReactSlider
            min={0}
            max={15}
            defaultValue={[0, 15]}
            step={0.1}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={1}
            className="flex items-center w-full h-[50px]"
            thumbClassName="border-[1px] rounded-full w-8 h-8 bg-primary-500 cursor-pointer bg-white flex justify-center items-center text-sm font-semibold shadow-md"
            trackClassName="price-range-track"
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              setMinPrice(value[0])
              setMaxPrice(value[1])
            }}
          />
          <div className="flex justify-between items-center gap-4">
            <Input
              id="minPrice"
              label="Tối thiểu"
              value={minPrice.toString()}
              onChange={(value) => setMinPrice(parseInt(value))}
            />
            <BsDashLg size={30} />
            <Input
              id="maxPrice"
              label="Tối đa"
              value={maxPrice.toString()}
              onChange={(value) => setMaxPrice(parseInt(value))}
            />
          </div>

          <div className="text-lg text-neutral-600">
            Diện tích:
          </div>
          <ReactSlider
            min={0}
            max={150}
            defaultValue={[0, 150]}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={1}
            className="flex items-center w-full h-[50px]"
            thumbClassName="border-[1px] rounded-full w-8 h-8 bg-primary-500 cursor-pointer bg-white flex justify-center items-center text-sm font-semibold shadow-md"
            trackClassName="price-range-track"
            value={[minArea, maxArea]}
            onChange={(value) => {
              setMinArea(value[0])
              setMaxArea(value[1])
            }}
          />
          <div className="flex justify-between items-center gap-4">
            <Input
              id="minArea"
              label="Tối thiểu"
              value={minArea.toString()}
              onChange={(value) => setMinArea(parseInt(value))}
            />
            <BsDashLg size={30} />
            <Input
              id="maxArea"
              label="Tối đa"
              value={maxArea.toString()}
              onChange={(value) => setMaxArea(parseInt(value))}
            />
          </div>

          <div className="text-lg text-neutral-600">
            Tiện ích:
          </div>
          <MultiItemSelect
            placeholder="Thêm tiện ích"
            options={utilities.map((utility: any) => {
              return { value: utility.label, label: utility.label, icon: utility.icon }
            })}
            value={utility.map((utility: string) => { return { value: utility, label: utility, icon: undefined } })}
            onChange={(utility: any) => {
              setUtility(utility.map((item: any) => item.value))
            }}
          />

          <div className="text-lg text-neutral-600">
            Giới tính:
          </div>
          <ItemSelect
            onChange={(value) => {
              setIsMale((value.label === 'Nam'))
            }}
            value={(isMale === undefined) ? {} : (isMale ? { label: 'Nam' } : { label: 'Nữ' })}
            options={[{ label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }]}
            placeholder="Giới tính"
            isClearable={false}
          />

          <div className="flex justify-end mt-6">
            <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
              <Button
                label='Áp dụng'
                onClick={onApply}
                disabled={isLoading}
              />
            </div>
          </div>
        </PopupInputContainer>
      </dialog>
    </>
  )
}