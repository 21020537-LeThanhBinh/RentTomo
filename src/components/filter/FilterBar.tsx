'use client'

import formatBigNumber from "@/utils/formatBigNumber"
import { useState } from "react"
import Button from "../Button"
import CategoryInput from "../input/CategoryInput"
import Input from "../input/Input"
import ItemSelect from "../input/ItemSelect"
import MultiItemSelect from "../input/MultiItemSelect"
import { utilities } from "./Utilities"

export default function FilterBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [utility, setUtility] = useState<string[]>([])
  const [isMale, setIsMale] = useState<boolean | undefined>()

  return (
    <div className="p-6 border-[1px] rounded-xl relative ">
      <div className="absolute top-6 left-0 text-xl font-semibold text-center w-full">
        <span>Bộ lọc</span>
      </div>

      <div className="flex flex-col gap-4 mt-14">
        <CategoryInput
          onChange={(value) => setCategory(value)}
          value={category}
        />

        <Input
          onChange={(value) => setPrice(parseInt(value.replace(/\D/g, "")))}
          value={formatBigNumber(price)}
          id="price"
          label="Giá thuê"
          formatPrice
          type="string"
          disabled={isLoading}
          required
        />


        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
          {utilities.map((item) => (
            <div key={item.label} className="col-span-1">
              <UtilityBox
                onClick={(item) => {
                  utility.some((utility: string) => utility === item) ?
                    setUtility(utility.filter((utility: string) => utility !== item)) :
                    setUtility([...utility, item])
                }}
                selected={utility.some((utility: string) => utility === item.label)}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div> */}

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

        <ItemSelect
          onChange={(value) => {
            setIsMale((value.label === 'Nam'))
          }}
          value={(isMale === undefined) ? {} : (isMale ? { label: 'Nam' } : { label: 'Nữ' })}
          options={[{ label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }]}
          placeholder="Giới tính"
          isClearable={false}
        />
      </div>

      <div className="flex justify-end mt-6">
        <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
          <Button
            label='Áp dụng'
            onClick={() => { }}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}