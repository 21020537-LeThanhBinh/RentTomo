import { useEffect, useState } from "react";
import cityList from '../../../public/DiaGioiHanhChinhVN.json' assert { type: 'json' };
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
  const [districtList, setDistrictList] = useState<any[]>([])
  const [wardList, setWardList] = useState<any[]>([])

  useEffect(() => {
    setFieldValue("address.district", "")
    setDistrictList(cityList.find((city: any) => city.Name === value?.city)?.Districts || [])
  }, [value?.city])

  useEffect(() => {
    setFieldValue("address.ward", "")
    setWardList(districtList.find((district: any) => district.Name === value?.district)?.Wards || [])
  }, [value?.district])

  // const getLocationList = (type: string) => {
  //   if (type === "city") {
  //     return cityList
  //       ?.map((city: any) => city.Name)
  //   }
  //   if (type === "district") {
  //     return cityList
  //       ?.find((city: any) => city.Name === value?.city)?.Districts
  //       ?.map((district: any) => district.Name)
  //   }
  //   if (type === "ward") {
  //     return cityList
  //       ?.find((city: any) => city.Name === value?.city)?.Districts
  //       ?.find((district: any) => district.Name === value?.district)?.Wards
  //       ?.map((ward: any) => ward.Name)
  //   }
  // }

  return (
    <dialog ref={addressRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden'>
      <PopupInputContainer label="Chọn địa chỉ" onBack={() => addressRef.current?.close()}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <ItemSelect
              placeholder="Chọn tỉnh thành"
              options={cityList?.map((city: any) => {
                return { value: city.Name, label: city.Name, Id: city.Id }
              })}
              value={{ label: value?.city, value: value?.city }}
              onChange={(value: any) => {
                setFieldValue("address.city", value?.value)
                setDistrictList(cityList.find((city: any) => city.Id === value?.Id)?.Districts || [])
              }}
            />

            <ItemSelect
              placeholder="Chọn quận huyện"
              options={districtList.map((district: any) => {
                return { value: district.Name, label: district.Name, Id: district.Id }
              })}
              value={{ label: value?.district, value: value?.district }}
              onChange={(value: any) => {
                setFieldValue("address.district", value?.value)
                setWardList(districtList.find((district: any) => district.Id === value?.Id)?.Wards || [])
              }}
            />

            <ItemSelect
              placeholder="Chọn phường xã"
              options={wardList.map((ward: any) => {
                return { value: ward.Name, label: ward.Name, Id: ward.Id }
              })}
              value={{ label: value?.ward, value: value?.ward }}
              onChange={(value: any) => {
                setFieldValue("address.ward", value?.value)
                setFieldValue("address.ward_id", value?.Id)
              }}
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