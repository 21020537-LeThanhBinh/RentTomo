import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "./Input";
import ItemSelect from "./ItemSelect";
import PopupInputContainer from "./PopupInputContainer";

export type AddressValue = {
  city: string;
  district: string;
  ward: string;
  number: string;
}

interface AddressProps {
  value?: AddressValue;
  setFieldValue: (name: string, value: string) => void;
  isLoading: boolean;
  addressRef: React.RefObject<HTMLDialogElement>;
}

export default function AddressInputPopup({ value, setFieldValue, isLoading, addressRef }: AddressProps) {
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    async function fetchMap() {
      const res = await fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json").then((res) => res.json());
      setMap(res)
    }

    fetchMap()
  }, [])

  useEffect(() => {
    setFieldValue("address.district", "")
  }, [value?.city])

  useEffect(() => {
    setFieldValue("address.ward", "")
  }, [value?.district])

  const getLocationList = (type: string) => {
    if (type === "city") {
      return map
        ?.map((city: any) => city.Name)
    }
    if (type === "district") {
      return map
        ?.find((city: any) => city.Name === value?.city)?.Districts
        ?.map((district: any) => district.Name)
    }
    if (type === "ward") {
      return map
        ?.find((city: any) => city.Name === value?.city)?.Districts
        ?.find((district: any) => district.Name === value?.district)?.Wards
        ?.map((ward: any) => ward.Name)
    }
  }

  return (
    <dialog ref={addressRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden'>
      <PopupInputContainer label="Chọn địa chỉ" onBack={() => addressRef.current?.close()}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <ItemSelect
              placeholder="Chọn tỉnh thành"
              options={getLocationList("city")?.map((city: any) => {
                return { value: city, label: city }
              })}
              value={{ label: value?.city, value: value?.city }}
              onChange={(value: any) => setFieldValue("address.city", value?.value)}
            />

            <ItemSelect
              placeholder="Chọn quận huyện"
              options={getLocationList("district")?.map((district: any) => {
                return { value: district, label: district }
              })}
              value={{ label: value?.district, value: value?.district }}
              onChange={(value: any) => setFieldValue("address.district", value?.value)}
            />

            <ItemSelect
              placeholder="Chọn phường xã"
              options={getLocationList("ward")?.map((ward: any) => {
                return { value: ward, label: ward }
              })}
              value={{ label: value?.ward, value: value?.ward }}
              onChange={(value: any) => setFieldValue("address.ward", value?.value)}
            />

            <Input
              onChange={(value) => setFieldValue("address.number", value)}
              value={value?.number || ""}
              id="address.number"
              label="Nhập số nhà, tên đường"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end">
            <div className='w-1/3'>
              <Button
                label='Xong'
                onClick={(e) => { e.preventDefault(); addressRef.current?.close() }}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </PopupInputContainer>
    </dialog>
  )
}