'use client'

import { ISearchParams } from "@/types"
import handleCloseDialog from "@/utils/handleCloseDialog"
import { createQueryString, deleteQueryString } from "@/utils/queryString"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { AiFillQuestionCircle } from "react-icons/ai"
import ReactSlider from 'react-slider'
import { categoryOptions } from "../input/CategoryInput"
import ItemSelect from "../input/ItemSelect"
import MultiItemSelect from "../input/MultiItemSelect"
import { utilities } from "../input/UtilityInput"
import AreaRange from "./AreaRange"
import CategorySelect from "./CategorySelect"
import PriceRange from "./PriceRange"
const ModalSingle = dynamic(() => import("../modal/ModalSingle"), { ssr: false })

const sexOptions = [{ label: 'Nam', value: 'male' }, { label: 'Nữ', value: 'female' }, { label: 'Không', value: 'none' }, { label: 'Tất cả', value: 'all' }]

export default function FilterBarClient({ searchParams, className, children }: { searchParams: ISearchParams, className?: string, children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const [category, setCategory] = useState<string[]>(searchParams.category ? searchParams.category?.split(',') : categoryOptions.map((option) => option.value))
  const [minPrice, setMinPrice] = useState<number>(searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0)
  const [maxPrice, setMaxPrice] = useState<number>(searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 15)
  const [minArea, setMinArea] = useState<number>(searchParams.minArea ? parseFloat(searchParams.minArea) : 0)
  const [maxArea, setMaxArea] = useState<number>(searchParams.maxArea ? parseFloat(searchParams.maxArea) : 60)
  const [utility, setUtility] = useState<string[]>(searchParams.utility ? searchParams.utility?.split(',') : [])
  const [radius, setRadius] = useState<number>(searchParams.range ? parseFloat(searchParams.range) : 0)
  const [sex, setSex] = useState<{ label: string, value: string }>({ label: "Tất cả", value: "all" })

  useEffect(() => {
    setIsLoading(false)
  }, []);

  useEffect(() => {
    if (pathname === '/search' && searchParams.page === 'all') {
      router.replace(pathname + '?' + deleteQueryString(searchParams, 'page'), { scroll: false })
    } else if (pathname === '/map' && searchParams.page !== 'all') {
      router.replace(pathname + '?' + createQueryString(searchParams, 'page', 'all'), { scroll: false })
    }

    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, dialogRef.current!, () => {
        dialogRef.current?.open && router.push(pathname + '?' + deleteQueryString(searchParams, 'popup'), { scroll: false })
      })
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router, pathname, searchParams])

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
    setMaxArea(searchParams.maxArea ? parseFloat(searchParams.maxArea) : 60)
    setUtility(searchParams.utility ? searchParams.utility?.split(',') : [])
    setSex(sexOptions.find((option) => option.value == searchParams.sex) || { label: "Tất cả", value: "all" })
    setRadius(searchParams.range ? parseFloat(searchParams.range) : 0)
  }, [searchParams])

  const onApply = async () => {
    const params = new URLSearchParams(searchParams as any)
    if (category.length < 4) params.set('category', category.toString())
    else params.delete('category')

    if (minPrice) params.set('minPrice', minPrice.toString())
    else params.delete('minPrice')
    if (maxPrice < 15) params.set('maxPrice', (maxPrice < 15) ? maxPrice.toString() : '')
    else params.delete('maxPrice')

    if (minArea) params.set('minArea', minArea.toString())
    else params.delete('minArea')
    if (maxArea < 60) params.set('maxArea', maxArea.toString())
    else params.delete('maxArea')

    if (utility.length) params.set('utility', utility.toString())
    else params.delete('utility')
    if (radius) params.set('range', radius.toString())
    params.set("sex", sex.value)

    params.delete('popup')
    params.sort()
    router.push(pathname + '?' + params.toString())
  }

  const onReset = () => {
    const params = new URLSearchParams(searchParams as any)
    params.delete('category')
    params.delete('minPrice')
    params.delete('maxPrice')
    params.delete('minArea')
    params.delete('maxArea')
    params.delete('utility')
    params.delete('range')
    params.delete("sex")
    params.delete('popup')
    router.push(pathname + '?' + params.toString())
  }

  return (
    <>
      <div
        onClick={() => router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'filter'), { scroll: false })}
        className={`${!isLoading && 'cursor-pointer'} ${className}`}
      >
        {children}
      </div>

      <ModalSingle
        modalRef={dialogRef}
        label="Bộ lọc"
        onBack={() => router.push(pathname + '?' + deleteQueryString(searchParams, 'popup'), { scroll: false })}
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
        <PriceRange
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="text-lg text-neutral-600">
          Diện tích:
        </div>
        <AreaRange
          minArea={minArea}
          setMinArea={setMinArea}
          maxArea={maxArea}
          setMaxArea={setMaxArea}
        />

        <div className="text-lg text-neutral-600 flex items-center gap-2">
          <span>Bán kính:</span>
          <AiFillQuestionCircle size={16} title={"Chọn địa điểm trên bản đồ để tìm trọ xung quanh"} className="cursor-pointer" />
        </div>
        <ReactSlider
          min={100}
          max={5000}
          defaultValue={radius || 2000}
          ariaLabel={"Radius slider"}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          value={radius || 2000}
          onChange={(value) => {
            setRadius(value)
          }}
          step={100}
          renderThumb={(props, state) => <div {...props} key={props.key}><div className="absolute -top-6 text-neutral-600">{state.valueNow}m</div></div>}
          className={`flex items-center w-full h-[50px] ${!radius && 'opacity-50'}`}
          thumbClassName={`border-[1px] rounded-full w-8 h-8 cursor-pointer bg-white flex justify-center items-center shadow-md ${!radius && 'cursor-not-allowed'}`}
          trackClassName="radius-range-track"
          disabled={!radius}
        />

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
          Thành viên:
        </div>
        <ItemSelect
          onChange={(value) => setSex({ value: value?.value || 'all', label: value?.label || 'Tất cả' })}
          value={sex}
          options={sexOptions}
          placeholder="Giới tính"
        />

        <div className="flex justify-between items-center mt-6">
          <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
            <button onClick={onReset} className="underline whitespace-nowrap text-neutral-600 font-semibold">
              Cài lại
            </button>
          </div>
          <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
            <button onClick={onApply} className={`relative rounded-lg hover:opacity-80 transition w-full text-white bg-neutral-800 border-neutral-800 text-md py-3 font-semibold border-2`}>
              Áp dụng
            </button>
          </div>
        </div>
      </ModalSingle>
    </>
  )
}