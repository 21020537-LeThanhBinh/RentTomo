'use client'

import Button from '@/components/Button';
import { utilities } from '@/components/filter/Utilities';
import AddressInputPopup from '@/components/input/AddressInputPopup';
import CategoryInput from '@/components/input/CategoryInput';
import ImageUpload from '@/components/input/ImageUpload';
import Input from '@/components/input/Input';
import ItemSelect from '@/components/input/ItemSelect';
import MultiItemSelect from '@/components/input/MultiItemSelect';
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
      <form className="my-8 rounded-2xl border-2 flex flex-col md:flex-row gap-6 p-6">
        <div className="flex flex-col gap-4 md:w-1/3 w-full">
          <ImageUpload
            onChange={(value) => formik.setFieldValue("imageSrc", [value])}
            value={formik.values.imageSrc[0]}
          />

          {/* Video upload */}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <CategoryInput
            onChange={(value) => formik.setFieldValue("category", value)}
            value={formik.values.category}
          />

          <div>
            <div onClick={() => !addressRef.current?.open && addressRef.current?.showModal()}>
              <ItemSelect
                onChange={() => !addressRef.current?.open && addressRef.current?.showModal()}
                value={{ label: formatAddress(formik.values.address) }}
                placeholder="Địa chỉ"
                isClearable={false}
                alwaysClosed={true}
                tabIndex={-1}
              />
            </div>

            <AddressInputPopup
              value={formik.values.address}
              setFieldValue={(name, value) => formik.setFieldValue(name, value)}
              isLoading={isLoading}
              addressRef={addressRef}
            />
          </div>

          <MultiItemSelect
            placeholder="Thêm tiện ích"
            options={utilities.map((utility: any) => {
              return { value: utility.label, label: utility.label, icon: utility.icon }
            })}
            value={formik.values.utility.map((utility: string) => { return { value: utility, label: utility, icon: undefined } })}
            onChange={(utility: any) => {
              formik.setFieldValue("utility", utility.map((item: any) => item.value))
            }}
          />

          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto">
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
          </div> */}

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
            multiline
          />

          <div className="flex justify-end mt-2">
            <div className='w-full sm:w-1/2 lg:w-1/3 flex gap-4'>
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
