'use client'

import formatBigNumber from "@/utils/formatBigNumber"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

export default function FeeView({
  name,
  value,
  counterValue,
  setCounterValue,
  openCalc,
}: {
  name: string
  value?: number
  counterValue: number
  setCounterValue: (value: number) => void
  openCalc: boolean
}) {
  const [width, setWidth] = useState(0);
  const spanRef = useRef<any>();

  useEffect(() => {
    if (!spanRef.current) return;

    setWidth(spanRef.current.offsetWidth);
  }, [counterValue, openCalc]);

  const onAdd = useCallback(() => {
    setCounterValue(counterValue + 1);
  }, [setCounterValue, counterValue]);

  const onReduce = useCallback(() => {
    if (counterValue === 0) {
      return;
    }

    setCounterValue(counterValue - 1);
  }, [setCounterValue, counterValue]);

  return (
    <div className="w-full flex justify-between items-start">
      <span className="flex-1">{name}</span>

      <div hidden={!openCalc} className="flex-1 flex justify-center items-start">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div
              onClick={onReduce}
              className="
                rounded-full
                border-[1px]
                border-neutral-400
                flex
                items-center
                justify-center
                text-neutral-600
                cursor-pointer
                hover:opacity-80
                transition
                select-none
              "
            >
              <AiOutlineMinus />
            </div>

            <div className="">
              <span ref={spanRef} className="invisible absolute opacity-0">{counterValue}</span>
              <input
                type="number"
                style={{ width: Math.max(width, 10) }}
                onChange={(e) => setCounterValue(Number(e.target.value))}
                value={counterValue.toString()}
              />
            </div>

            <div
              onClick={onAdd}
              className="
                rounded-full
                border-[1px]
                border-neutral-400
                flex
                items-center
                justify-center
                text-neutral-600
                cursor-pointer
                hover:opacity-80
                transition
                select-none
              "
            >
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      </div>

      <span className="flex-1 text-end">
        {(value != undefined) && `đ ${formatBigNumber(value)}`}
      </span>
    </div>
  )
}