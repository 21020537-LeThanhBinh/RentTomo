'use client'

import formatBigNumber from "@/utils/formatBigNumber"
import Input from "./Input"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"

export default function OtherFeesInput({
  values,
  setFieldValue,
  isLoading
}: {
  values: any
  setFieldValue: (name: string, value: any) => void
  isLoading: boolean
}) {
  const [otherFees, setOtherFees] = useState(
    Object.keys(values.fees).filter((item: any) => item !== "deposit" && values.fees[item] != null)
  )
  const [newFee, setNewFee] = useState<{ key: string, value: number }>()

  useEffect(() => {
    if (newFee && newFee.key.search(':') !== -1) {
      const key = newFee.key.split(':')
      setFieldValue(`fees.${key[0]}`, parseInt(key[1]?.replace(/\D/g, "")))
      setOtherFees([...otherFees, key[0]])
      setNewFee(undefined)
    }
  }, [newFee])

  return (
    <div className='flex flex-col sm:grid grid-cols-4 gap-4'>
      {otherFees.map((key) => {
        return (
          <div key={key} className="row-span-1 relative">
            <Input
              onChange={(value) => setFieldValue(`fees.${key}`, parseInt(value.replace(/\D/g, "")))}
              value={formatBigNumber(values.fees[key])}
              id={key}
              label={key}
              formatPrice
              type="string"
              disabled={isLoading}
              autoFocus
            />

            <button
              type="button"
              onClick={() => {
                setFieldValue(`fees.${key}`, null)
                setOtherFees(otherFees.filter((item) => item !== key))
              }}
              className="absolute right-2 top-2"
            >
              <AiOutlineMinusCircle size={16} />
            </button>
          </div>
        )
      })}

      {newFee ? (
        <div className="row-span-1">
          <Input
            onChange={(value) => {
              setNewFee({ key: value, value: 0 })
            }}
            value={newFee.key}
            id={"Phí khác"}
            label={"[Loại phí]: [số tiền]"}
            type="string"
            disabled={isLoading}
            autoFocus
          />
        </div>
      ) : (
        <div className="row-span-1">
          <button
            type="button"
            title="Thêm phí khác"
            onClick={() => { setNewFee({ key: "", value: 0 }) }}
            disabled={isLoading}
            className="h-[68px] w-[68px] border-2 rounded-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <AiOutlinePlusCircle size={20} className="text-neutral-700" />
          </button>
        </div>
      )}
    </div>
  )
}