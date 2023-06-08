'use client'

import Button from '@/components/Button';
import { utilities } from '@/components/filter/Utilities';
import Counter from '@/components/input/Counter';
import ImageUpload from '@/components/input/ImageUpload';
import Input from '@/components/input/Input';
import UtilityInput from '@/components/input/UtilityInput';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [map, setMap] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchMap() {
      const res = await fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json").then((res) => res.json());
      setMap(res)
    }

    fetchMap()
  }, [])

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);

    setTimeout(() => {
      toast.success('Listing created!');
      setIsLoading(false)
    }, 1000)
  }

  const formik = useFormik({
    initialValues: {
      category: "",
      location: {
        city: "",
        district: "",
        ward: "",
      },
      area: 1,
      room: 1,
      bathroom: 1,
      imageSrc: "",
      utility: [],
    },
    onSubmit: handleSubmit,
  } as FormikConfig<{
    category: string;
    location: {
      city: string;
      district: string;
      ward: string;
    },
    area: number;
    room: number;
    bathroom: number;
    imageSrc: string;
    utility: string[];
  }>
  );

  const getLocationList = (type: string) => {
    if (type === "city") {
      return map
        ?.map((city: any) => city.Name)
    }
    if (type === "district") {
      return map
        ?.find((city: any) => city.Name === formik.values.location.city)?.Districts
        ?.map((district: any) => district.Name)
    }
    if (type === "ward") {
      return map
        ?.find((city: any) => city.Name === formik.values.location.city)?.Districts
        ?.find((district: any) => district.Name === formik.values.location.district)?.Wards
        ?.map((ward: any) => ward.Name)
    }
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <form className="my-8 rounded-2xl border-2">
        <div className="flex flex-col p-4 gap-4 w-1/3">
          <ImageUpload
            onChange={(value) => formik.setFieldValue("imageSrc", value)}
            value={formik.values.imageSrc}
          />
        </div>

        <div className="flex flex-col p-4">
          <label htmlFor="category" className="font-medium">Loại phòng:</label>

          <select name="category" id="category" value={formik.values.category} onChange={formik.handleChange} className='w-1/3'>
            <option value="Tất cả">Tất cả</option>
            <option value="Phòng cho thuê">Phòng cho thuê</option>
            <option value="Phòng ở ghép">Phòng ở ghép</option>
            <option value="Ký túc xá">Ký túc xá</option>
            <option value="Nhà nguyên căn">Nhà nguyên căn</option>
            <option value="Căn hộ">Căn hộ</option>
          </select>
        </div>

        <div className='flex flex-col p-4'>
          <label htmlFor="utility" className="font-medium">Tiện ích:</label>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
            {utilities.map((item) => (
              <div key={item.label} className="col-span-1">
                <UtilityInput
                  onClick={(utility) => {
                    formik.values.utility.some((utility: string) => utility === item.label) ?
                      formik.setFieldValue("utility", formik.values.utility.filter((utility: string) => utility !== item.label)) :
                      formik.setFieldValue("utility", [...formik.values.utility, utility])
                  }}
                  selected={formik.values.utility.some((utility: string) => utility === item.label)}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-4">
          <label htmlFor="location" className="font-medium">Địa chỉ:</label>

          <div>
            <input list="cities" type="text" name="location.city" id="location.city" value={formik?.values?.location?.city} onChange={formik.handleChange} placeholder="Chọn tỉnh thành" />
            <datalist id="cities">
              {getLocationList("city")?.map((city: any) => {
                return <option key={city} value={city}>{city}</option>
              })}
            </datalist>

            <input list="districts" type="text" name="location.district" id="location.district" value={formik?.values?.location?.district} onChange={formik.handleChange} placeholder="Chọn quận huyện" />
            <datalist id="districts">
              {formik?.values?.location?.city && getLocationList("district")?.map((district: any) => {
                return <option key={district} value={district}>{district}</option>
              })}
            </datalist>

            <input list="wards" type="text" name="location.ward" id="location.ward" value={formik?.values?.location?.ward} onChange={formik.handleChange} placeholder="Chọn phường xã" />
            <datalist id="wards">
              {formik?.values?.location?.district && getLocationList("ward")?.map((ward: any) => {
                return <option key={ward} value={ward}>{ward}</option>
              })}
            </datalist>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-4">
          <Counter
            onChange={(value) => formik.setFieldValue("area", value)}
            value={formik.values.area}
            title='Diện tích'
            subtitle='Diện tích phòng (m2)?'
          />
          <hr />
          <Counter
            onChange={(value) => formik.setFieldValue("room", value)}
            value={formik.values.room}
            title="Số phòng"
            subtitle="Bao nhiêu phòng cho thuê?"
          />
          <hr />
          <Counter
            onChange={(value) => formik.setFieldValue("bathroom", value)}
            value={formik.values.bathroom}
            title="Phòng tắm"
            subtitle="Có bao nhiêu phòng tắm"
          />
        </div>

        <div className="flex flex-col p-4 gap-4">
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col p-4 gap-4">
          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex justify-end">
          <div className='w-1/3 flex p-4 gap-4'>
            <Button
              label='Hủy'
              onClick={() => router.back()}
              disabled={isLoading}
              outline
            />
            <Button
              label='Đăng tin'
              onClick={() => formik.handleSubmit()}
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
