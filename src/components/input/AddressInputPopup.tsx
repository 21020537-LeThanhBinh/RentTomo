import { useEffect, useState } from "react";
import cityList from '../../../public/DiaGioiHanhChinhVN.json' assert { type: 'json' };
import Button from "../Button";
import Input from "./Input";
import ItemSelect from "./ItemSelect";
import PopupInputContainer from "./PopupInputContainer";

export type AddressValue = {
  city_id: string;
  district_id: string;
  ward_id: string;
  number: string;
}

interface AddressProps {
  value?: AddressValue;
  setFieldValue: (name: string, value: string) => void;
  isLoading: boolean;
  addressRef: React.RefObject<HTMLDialogElement>;
  setAddressLabel: (label: string) => void;
}

export default function AddressInputPopup({ value, setFieldValue, isLoading, addressRef, setAddressLabel }: AddressProps) {
  const [city, setCity] = useState<any>()
  const [district, setDistrict] = useState<any>()
  const [ward, setWard] = useState<any>()

  useEffect(() => {
    const thisCity = cityList.find((city: any) => city.Id === value?.city_id)

    setCity(thisCity)
    setDistrict(null)
    setFieldValue("address.district_id", "")
  }, [value?.city_id])

  useEffect(() => {
    const thisDistrict = city?.Districts.find((district: any) => district.Id === value?.district_id)

    setDistrict(thisDistrict)
    setWard(null)
    setFieldValue("address.ward_id", "")
  }, [value?.district_id])

  useEffect(() => {
    const thisWard = district?.Wards.find((ward: any) => ward.Id === value?.ward_id)

    setWard(thisWard)
  }, [value?.ward_id])

  useEffect(() => {
    const newAddress = []
    if (value?.number) newAddress.push(value.number)
    if (ward) newAddress.push(ward.Name)
    if (district) newAddress.push(district.Name)
    if (city) newAddress.push(city.Name)

    setAddressLabel(newAddress.join(", "))
  }, [value?.number, ward, district, city])

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
              value={{ label: city?.Name, value: city?.Name }}
              onChange={(value: any) => {
                setFieldValue("address.city_id", value?.Id)
              }}
            />

            <ItemSelect
              placeholder="Chọn quận huyện"
              options={city?.Districts.map((district: any) => {
                return { value: district.Name, label: district.Name, Id: district.Id }
              })}
              value={{ label: district?.Name, value: district?.Name }}
              onChange={(value: any) => {
                setFieldValue("address.district_id", value?.Id)
              }}
            />

            <ItemSelect
              placeholder="Chọn phường xã"
              options={district?.Wards.map((ward: any) => {
                return { value: ward.Name, label: ward.Name, Id: ward.Id }
              })}
              value={{ label: ward?.Name, value: ward?.Name }}
              onChange={(value: any) => {
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