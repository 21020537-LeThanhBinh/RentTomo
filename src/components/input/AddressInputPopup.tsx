import { useEffect, useRef, useState } from "react";
import cityList from '../../../public/DiaGioiHanhChinhVN.json' assert { type: 'json' };
import Button from "../Button";
import ModalSingle from "../modal/ModalSingle";
import Input from "./Input";
import ItemSelect from "./ItemSelect";
import { BiChevronDown } from "react-icons/bi";

export type AddressValue = {
  city_id: string;
  district_id: string;
  ward_id: string;
  street: string;
  number: string;
}

interface AddressProps {
  value?: AddressValue;
  setFieldValue: (name: string, value: string) => void;
  isLoading: boolean;
  addressRef: React.RefObject<HTMLDialogElement>;
  setAddressLabel: (label: string) => void;
  selectedPoint: { lat: number, lng: number }
  setSelectedPoint: (point: { lat: number, lng: number }) => void
}

export default function AddressInputPopup({ value, setFieldValue, isLoading, addressRef, setAddressLabel, selectedPoint, setSelectedPoint }: AddressProps) {
  const isFirstRender = useRef(true);
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
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const newAddress = [] as any[]
    if (value?.number) newAddress.push(value.number)
    if (value?.street) newAddress.push(value.street)
    if (ward) newAddress.push(ward.Name)
    if (district) newAddress.push(district.Name)
    if (city) newAddress.push(city.Name)

    const delayDebounceFn = setTimeout(() => {
      setAddressLabel(newAddress.join(", "))
    }, 1000)
    
    return () => clearTimeout(delayDebounceFn)
  }, [value?.number, value?.street, ward, district, city])

  return (
    <ModalSingle modalRef={addressRef} label="Chọn địa chỉ" onBack={() => addressRef.current?.close()}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <ItemSelect
            placeholder="Chọn tỉnh thành"
            options={cityList?.map((city: any) => {
              return { value: city.Name, label: city.Name, Id: city.Id }
            })}
            value={{ label: city?.Name || "", value: city?.Name || "" }}
            onChange={(value: any) => {
              setFieldValue("address.city_id", value?.Id)
            }}
          />

          <ItemSelect
            placeholder="Chọn quận huyện"
            options={city?.Districts.map((district: any) => {
              return { value: district.Name, label: district.Name, Id: district.Id }
            })}
            value={{ label: district?.Name || "", value: district?.Name || "" }}
            onChange={(value: any) => {
              setFieldValue("address.district_id", value?.Id)
            }}
          />

          <ItemSelect
            placeholder="Chọn phường xã"
            options={district?.Wards.map((ward: any) => {
              return { value: ward.Name, label: ward.Name, Id: ward.Id }
            })}
            value={{ label: ward?.Name || "", value: ward?.Name || "" }}
            onChange={(value: any) => {
              setFieldValue("address.ward_id", value?.Id)
            }}
          />

          <Input
            onChange={(value) => setFieldValue("address.street", value)}
            value={value?.street || ""}
            id="address.street"
            label="Nhập tên đường"
            disabled={isLoading}
          />

          <Input
            onChange={(value) => setFieldValue("address.number", value)}
            value={value?.number || ""}
            id="address.number"
            label="Nhập số nhà, ngõ, ..."
            disabled={isLoading}
          />

          <details>
            <summary className="flex w-full cursor-pointer items-center justify-between transition duration-300 text-neutral-600 pb-4">
              <span className="underline">Nâng cao</span>
              <div className="BiChevronDown">
                <BiChevronDown size={25} className="transition-all duration-300 ease-in-out" />
              </div>
            </summary>

            <Input
              onChange={(value) =>
                setSelectedPoint(value.split(',').length === 2 ?
                  { lat: parseFloat(value.split(',')[0]), lng: parseFloat(value.split(',')[1]) }
                  : selectedPoint
                )
              }
              value={(selectedPoint.lat + ', ' + selectedPoint.lng) || ""}
              id="location"
              label="Tọa độ"
              disabled={isLoading}
            />
          </details>

        </div>

        <div className="flex justify-end gap-4">
          <div className='w-1/2 sm:w-1/4'>
            <Button
              label='Hủy'
              onClick={(e) => { e.preventDefault(); setFieldValue("address.city_id", ''); addressRef.current?.close() }}
              disabled={isLoading}
              outline
            />
          </div>
          <div className='w-1/2 sm:w-1/4'>
            <Button
              label='Xong'
              onClick={(e) => { e.preventDefault(); addressRef.current?.close() }}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </ModalSingle>
  )
}