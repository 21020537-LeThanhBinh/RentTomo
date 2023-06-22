'use client'

import Button from '@/components/Button';
import AddressInputPopup from '@/components/input/AddressInputPopup';
import CategoryInput from '@/components/input/CategoryInput';
import ImageUpload from '@/components/input/ImageUpload';
import Input from '@/components/input/Input';
import ItemSelect from '@/components/input/ItemSelect';
import MultiItemSelect from '@/components/input/MultiItemSelect';
import { utilities } from '@/components/input/UtilityInput';
import { supabase } from '@/supabase/supabase-app';
import formatBigNumber from '@/utils/formatBigNumber';
import handleCloseDialog from '@/utils/handleCloseDialog';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function PostClient() {
  const router = useRouter()
  const addressRef = useRef<HTMLDialogElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [addressLabel, setAddressLabel] = useState<string>('')
  const [files, setFiles] = useState<any[]>([])

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
    const uid = (await supabase.auth.getUser())?.data?.user?.id
    if (!uid) return toast.error('Bạn chưa đăng nhập!')

    if (files.length < 3) {
      toast.error('Hãy thêm từ 3 đến 12 ảnh.');
      return;
    }

    if (Object.keys(values).filter((key) => key != 'is_male').some((key) => !values[key])) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setIsLoading(true);

    const multiUpload = await Promise.all(files.map((file) => handleUploadImages(file)));
    const image_src = multiUpload.map((item) => item.secure_url)

    const listingValues = {
      ...values,
      author_id: uid,
      address: values.address.number,
      address_id: {
        city_id: values.address.city_id,
        district_id: values.address.district_id,
        ward_id: values.address.ward_id
      },
      image_src: image_src,
    } as any

    const { data, error } = await supabase
      .from('posts')
      .insert([listingValues])

    if (!error) {
      toast.success('Đăng tin thành công!');
      router.refresh()
      formik.resetForm()
      setFiles([])
    } else {
      toast.error('Đã có lỗi xảy ra!');
      console.log(data, error)
    }

    setIsLoading(false);
  }

  const handleUploadImages = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'swnb0zrk');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dhfrxvhb2/image/upload', {
        method: 'POST',
        body: formData
      })
      return response.json();
    } catch (error) {
      return error;
    }
  }

  const formik = useFormik({
    initialValues: {
      category: "",
      address: {
        city_id: "",
        district_id: "",
        ward_id: "",
        number: "",
      },
      area: 0,
      utility: [],
      title: "",
      description: "",
      price: 0,
      fees: {
        deposit: 0,
        electricity: 0,
        water: 0,
        internet: 0,
      },
      is_male: null,
    },
    onSubmit: handleSubmit,
  } as FormikConfig<{
    category: string;
    address: {
      city_id: string;
      district_id: string;
      ward_id: string;
      number: string;
    },
    area: number;
    utility: string[];
    title: string;
    description: string;
    price: number;
    fees: {
      deposit: number;
      electricity: number;
      water: number;
      internet: number;
    }
    is_male: boolean | null;
  }>
  );

  return (
    <form className="my-8 rounded-2xl border-2 flex flex-col md:flex-row gap-6 p-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 md:w-1/3 w-full relative">
        <div className='font-semibold text-lg text-neutral-600'>
          Hình ảnh và Video
        </div>

        <ImageUpload
          files={files}
          setFiles={setFiles}
        />

        {/* Video upload */}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className='font-semibold text-lg text-neutral-600'>
          Thông tin chung
        </div>

        <CategoryInput
          onChange={(value) => formik.setFieldValue("category", value)}
          value={formik.values.category}
        />

        <div>
          <div onClick={() => !addressRef.current?.open && addressRef.current?.showModal()}>
            <ItemSelect
              onChange={() => !addressRef.current?.open && addressRef.current?.showModal()}
              value={{ label: addressLabel }}
              placeholder="Địa chỉ"
              isClearable={false}
              alwaysClosed={true}
              tabIndex={-1}
              required
            />
          </div>

          <AddressInputPopup
            value={formik.values.address}
            setFieldValue={(name, value) => formik.setFieldValue(name, value)}
            isLoading={isLoading}
            addressRef={addressRef}
            setAddressLabel={setAddressLabel}
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

        <ItemSelect
          onChange={(value) => {
            formik.setFieldValue('is_male', value.label === 'Giới tính bất kỳ' ? null : (value.label === 'Nam'))
          }}
          value={(formik.values.is_male === null) ? { label: 'Giới tính bất kỳ' } : (formik.values.is_male ? { label: 'Nam' } : { label: 'Nữ' })}
          options={[{ label: 'Giới tính bất kỳ', value: 'Giới tính bất kỳ' }, { label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }]}
          placeholder="Giới tính"
          isClearable={false}
        />

        <Input
          onChange={(value) => formik.setFieldValue("area", value)}
          value={formik.values.area ? formik.values.area.toString() : ""}
          id="area"
          label="Diện tích (m²)"
          disabled={isLoading}
          required
        />

        <div className='font-semibold text-lg text-neutral-600 mt-2'>
          Giá thuê và các khoản phí
        </div>

        <Input
          onChange={(value) => formik.setFieldValue("price", parseInt(value.replace(/\D/g, "")))}
          value={formatBigNumber(formik.values.price)}
          id="price"
          label="Giá thuê (/tháng)"
          formatPrice
          type="string"
          disabled={isLoading}
          required
        />

        <Input
          onChange={(value) => formik.setFieldValue("fees.deposit", parseInt(value.replace(/\D/g, "")))}
          value={formatBigNumber(formik.values.fees.deposit)}
          id="deposit"
          label="Tiền cọc"
          formatPrice
          type="string"
          disabled={isLoading}
          required
        />

        <div className='flex gap-2'>
          <Input
            onChange={(value) => formik.setFieldValue("fees.electricity", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(formik.values.fees.electricity)}
            id="electricity"
            label="Điện (/kWh)"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => formik.setFieldValue("fees.water", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(formik.values.fees.water)}
            id="water"
            label="Nước (/m³)"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />

          <Input
            onChange={(value) => formik.setFieldValue("fees.internet", parseInt(value.replace(/\D/g, "")))}
            value={formatBigNumber(formik.values.fees.internet)}
            id="internet"
            label="Wifi (/tháng)"
            formatPrice
            type="string"
            disabled={isLoading}
            required
          />
        </div>

        <div className='font-semibold text-lg text-neutral-600 mt-2'>
          Nội dung tin đăng
        </div>

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
              onClick={() => { }}
              disabled={isLoading}
              type='submit'
            />
          </div>
        </div>
      </div>
    </form >
  )
}
