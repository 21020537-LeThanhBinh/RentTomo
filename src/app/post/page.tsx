'use client'

import Button from '@/components/Button';
import { utilities } from '@/components/filter/Utilities';
import AddressSelect from '@/components/input/AddressSelect';
import CategoryInput from '@/components/input/CategoryInput';
import ImageUpload from '@/components/input/ImageUpload';
import Input from '@/components/input/Input';
import UtilityInput from '@/components/input/UtilityInput';
import { supabase } from '@/supabase/supabase-app';
import formatAddress from '@/utils/formatAddress';
import formatBigNumber from '@/utils/formatBigNumber';
import handleCloseDialog from '@/utils/handleCloseDialog';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const addressRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, addressRef.current!, () => addressRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);

    const uid = (await supabase.auth.getUser())?.data?.user?.id

    if (!uid) return toast.error('Bạn chưa đăng nhập!')
    if (Object.keys(values).some((key) => !values[key])) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return setIsLoading(false);
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { ...values, author_id: uid, address: formatAddress(values.address) },
      ])

    if (!error) {
      toast.success('Đăng tin thành công!');
      router.refresh()
      formik.resetForm()

      console.log(data, error)
    } else {
      toast.error('Đã có lỗi xảy ra!');

      console.log(data, error)
    }

    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      category: "",
      address: {
        city: "",
        district: "",
        ward: "",
        street: "",
        number: "",
      },
      area: 0,
      imageSrc: [],
      utility: [],
      title: "",
      description: "",
      price: 0,
      deposit: 0,
    },
    onSubmit: handleSubmit,
  } as FormikConfig<{
    category: string;
    address: {
      city: string;
      district: string;
      ward: string;
      street: string;
      number: string;
    },
    area: number;
    imageSrc: string[];
    utility: string[];
    title: string;
    description: string;
    price: number;
    deposit: number;
  }>
  );

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <form className="my-8 rounded-2xl border-2 flex flex-col md:flex-row">
        <div className="flex flex-col p-4 gap-8 md:w-1/3 w-full">
          <ImageUpload
            onChange={(value) => formik.setFieldValue("imageSrc", [value])}
            value={formik.values.imageSrc[0]}
          />

          {/* Video upload */}
        </div>

        <div className="flex flex-col gap-8 p-4">
          <CategoryInput
            onChange={(value) => formik.setFieldValue("category", value)}
            value={formik.values.category}
          />

          <div>
            <Input
              onClick={() => !addressRef.current?.open && addressRef.current?.showModal()}
              onChange={() => !addressRef.current?.open && addressRef.current?.showModal()}
              value={formatAddress(formik.values.address)}
              id="address"
              label="Địa chỉ"
              disabled={isLoading}
              required
            />

            <dialog ref={addressRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%]'>
              <div className="w-full absolute left-0 flex justify-center z-40">
                <div className="w-full bg-white px-10 pt-20 p-b-10 rounded-2xl">
                  <div className='flex'>
                    <button onClick={() => addressRef.current?.close()} className="absolute top-4 text-2xl z-10">🡠</button>
                    <div className="absolute top-4 left-0 text-2xl text-center w-full">
                      <span>Chọn địa chỉ</span>
                    </div>
                  </div>

                  <AddressSelect
                    value={formik.values.address}
                    setFieldValue={(name, value) => formik.setFieldValue(name, value)}
                    isLoading={isLoading}
                    addressRef={addressRef}
                  />
                </div>
              </div>
            </dialog>
          </div>

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

          <Input
            onChange={(value) => formik.setFieldValue("area", value)}
            value={formik.values.area ? formik.values.area.toString() : ""}
            id="area"
            label="Diện tích"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => formik.setFieldValue("price", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(formik.values.price)}
            id="price"
            label="Giá thuê"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => formik.setFieldValue("deposit", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(formik.values.deposit)}
            id="deposit"
            label="Số tiền cọc"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => formik.setFieldValue("title", value)}
            value={formik.values.title}
            id="title"
            label="Tiêu đề"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => formik.setFieldValue("description", value)}
            value={formik.values.description}
            id="description"
            label="Mô tả chi tiết"
            disabled={isLoading}
            required
          />

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
        </div>
      </form >
    </div >
  )
}
