'use client'

import { ISearchParams } from "@/types"
import handleCloseDialog from "@/utils/handleCloseDialog"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { BsDashLg } from "react-icons/bs"
import ReactSlider from 'react-slider'
import { categoryOptions } from "../input/CategoryInput"
import Input from "../input/Input"
import ItemSelect from "../input/ItemSelect"
import MultiItemSelect from "../input/MultiItemSelect"
import PopupInputContainer from "../input/PopupInputContainer"
import { utilities } from "../input/UtilityInput"
import CategorySelect from "./CategorySelect"
import { createQueryString, deleteQueryString } from "@/utils/queryString"

export default function FilterBar({ searchParams, children }: { searchParams: ISearchParams, children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const [category, setCategory] = useState<string[]>(searchParams.category ? searchParams.category?.split(',') : categoryOptions.map((option) => option.value))
  const [minPrice, setMinPrice] = useState<number>(searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0)
  const [maxPrice, setMaxPrice] = useState<number>(searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 15)
  const [minArea, setMinArea] = useState<number>(searchParams.minArea ? parseFloat(searchParams.minArea) : 0)
  const [maxArea, setMaxArea] = useState<number>(searchParams.maxArea ? parseFloat(searchParams.maxArea) : 150)
  const [utility, setUtility] = useState<string[]>(searchParams.utility ? searchParams.utility?.split(',') : [])
  const [isMale, setIsMale] = useState<boolean | undefined>((searchParams.isMale && searchParams.isMale !== "undefined") ? searchParams.isMale === 'true' : undefined)

  useEffect(() => {
    setIsLoading(false)

    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, dialogRef.current!, () => {
        dialogRef.current?.open && router.push(pathname + '?' + deleteQueryString(searchParams, 'popup'))
      })
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!searchParams.popup) {
      dialogRef.current?.close();
    } else if (searchParams.popup === "filter") {
      !dialogRef.current?.open && dialogRef.current?.showModal();
    }

    setCategory(searchParams.category ? searchParams.category?.split(',') : categoryOptions.map((option) => option.value))
    setMinPrice(searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0)
    setMaxPrice(searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 15)
    setMinArea(searchParams.minArea ? parseFloat(searchParams.minArea) : 0)
    setMaxArea(searchParams.maxArea ? parseFloat(searchParams.maxArea) : 150)
    setUtility(searchParams.utility ? searchParams.utility?.split(',') : [])
    setIsMale((searchParams.isMale && searchParams.isMale !== "undefined") ? searchParams.isMale === 'true' : undefined)
  }, [searchParams])

  const onApply = async () => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams as any)
    params.set('category', (category.length < 4) ? category.toString() : '')
    params.set('minPrice', minPrice.toString())
    params.set('maxPrice', (maxPrice < 15) ? maxPrice.toString() : '')
    params.set('minArea', minArea.toString())
    params.set('maxArea', maxArea.toString())
    params.set('utility', utility.toString())
    params.set('isMale', isMale?.toString() || 'undefined')
    params.delete('popup')
    router.push(pathname + '?' + params.toString())

    setIsLoading(false)
    // dialogRef.current?.close()
  }

  return (
    <>
      <div
        onClick={() => router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'filter'))}
        className={`
          p-6 border-2 border-black border-opacity-20 rounded-xl relative z-[10000] bg-white 
          ${!isLoading && 'cursor-pointer'}
          hidden sm:block 
          w-[320px] max-h-[518px]
        `}
      >
        {children}
      </div>

      <dialog ref={dialogRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%]'>
        <PopupInputContainer
          label="Bộ lọc"
          onBack={() => router.push(pathname + '?' + deleteQueryString(searchParams, 'popup'))}
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
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              setMinPrice(value[0])
              setMaxPrice(value[1])
            }}
            className="flex items-center w-full h-[50px]"
            thumbClassName="border-[1px] rounded-full w-8 h-8 bg-primary-500 cursor-pointer bg-white flex justify-center items-center text-sm font-semibold shadow-md"
            trackClassName="price-range-track"
          />
          <div className="flex justify-between items-center gap-4">
            <Input
              id="minPrice"
              label="Tối thiểu"
              value={minPrice.toString()}
              onChange={(value) => setMinPrice(value ? parseInt(value) : 0)}
            />
            <BsDashLg size={30} />
            <Input
              id="maxPrice"
              label="Tối đa"
              value={maxPrice.toString()}
              onChange={(value) => setMaxPrice(value ? parseInt(value) : 0)}
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
            value={[minArea, maxArea]}
            onChange={(value) => {
              setMinArea(value[0])
              setMaxArea(value[1])
            }}
            className="flex items-center w-full h-[50px]"
            thumbClassName="border-[1px] rounded-full w-8 h-8 bg-primary-500 cursor-pointer bg-white flex justify-center items-center text-sm font-semibold shadow-md"
            trackClassName="price-range-track"
          />
          <div className="flex justify-between items-center gap-4">
            <Input
              id="minArea"
              label="Tối thiểu"
              value={minArea.toString()}
              onChange={(value) => setMinArea(value ? parseInt(value) : 0)}
            />
            <BsDashLg size={30} />
            <Input
              id="maxArea"
              label="Tối đa"
              value={maxArea.toString()}
              onChange={(value) => setMaxArea(value ? parseInt(value) : 0)}
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
              setIsMale(value === null ? undefined : (value.label === 'Nam'))
            }}
            value={(isMale === undefined) ? {} : (isMale ? { label: 'Nam' } : { label: 'Nữ' })}
            options={[{ label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }]}
            placeholder="Giới tính"
          />

          <div className="flex justify-between items-center mt-6">
            <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
              <Link href={pathname} className="underline whitespace-nowrap text-neutral-600 font-semibold">
                Cài lại
              </Link>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
              <button
                onClick={onApply}
                className={`relative rounded-lg hover:opacity-80 transition w-full text-white bg-neutral-800 border-neutral-800 text-md py-3 font-semibold border-2`}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </PopupInputContainer>
      </dialog>
    </>
  )
}