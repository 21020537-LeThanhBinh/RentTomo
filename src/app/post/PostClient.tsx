'use client'

import { deleteImage } from '@/actions/deleteImage';
import { uploadImage } from '@/actions/uploadImage';
import { supabase } from '@/supabase/supabase-app';
import { IPostForm } from '@/types/postForm';
import { convertPointToCoordinates } from '@/utils/convertPointToCoordinates';
import imageSrcToPublicId from '@/utils/imageSrcToPublicId';
import { parseAddressId } from '@/utils/parseAddress';
import { FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import PostForm from './PostForm';

const provider = import('leaflet-geosearch').then(({ OpenStreetMapProvider }) => new OpenStreetMapProvider());

export default function PostClient({ listing }: { listing?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [imageSrcOld, setImageSrcOld] = useState<string[]>(listing?.image_src || [])
  const [files, setFiles] = useState<any[]>([])

  const [addressLabel, setAddressLabel] = useState<string>(listing ? (listing?.address + ', ' + parseAddressId(listing?.address_id)) : '')
  const [selectedPoint, setSelectedPoint] = useState<{ lat: number, lng: number }>(convertPointToCoordinates(listing?.location_text) || { lng: 107.9650855, lat: 15.9266657 })
  const [zoom, setZoom] = useState<number>(listing ? 15 : 5)

  useEffect(() => {
    if (!!listing) return
    if ((addressLabel.match(/,/g) || [])?.length >= 4) return;

    provider
      .then((provider) => provider
        .search({ query: (addressLabel + ", Việt Nam").replace(/Phường |Quận |Tỉnh |Thành phố /g, '') })
        .then((results: any) => {
          console.log(results)
          if (results.length > 0) {
            setSelectedPoint({ lng: results[0].x, lat: results[0].y })
          }
        }))
  }, [addressLabel])

  const handleSubmit = async (values: FormikValues) => {
    const userId = (await supabase.auth.getUser())?.data?.user?.id
    if (!checkSubmit(values, userId)) return
    setIsLoading(true);

    // Delete old images
    await Promise.all(listing?.image_src?.map((url: string) => {
      if (!imageSrcOld.some((keepUrl) => keepUrl === url))
        deleteImage(imageSrcToPublicId(url))
    }) || [])
    // Upload new images
    const multiUpload = await Promise.all(files.map((file) => uploadImage(file)));
    const imageSrcNew = multiUpload.map((item) => item.secure_url)

    const image_src = [...imageSrcOld, ...imageSrcNew]

    const listingValues = {
      ...values,
      author_id: userId,
      address: makeAddress(values),
      address_id: makeAddressId(values),
      image_src: image_src,
      location: `POINT(${selectedPoint.lng} ${selectedPoint.lat})`
    }

    let query
    if (listing?.id)
      query = supabase
        .from('posts')
        .upsert([{ ...listingValues, id: listing.id }])
        .select('id')
        .single()
    else
      query = supabase
        .from('posts')
        .insert([listingValues])
        .select('id')
        .single()
    const { data, error } = await query

    setIsLoading(false);
    if (error || !data)
      onSubmitFailure(error, imageSrcNew)
    else
      onSubmitSuccess(data.id, userId!)
  }

  const checkSubmit = (values: FormikValues, userId?: string) => {
    if (!userId) {
      toast.error('Bạn chưa đăng nhập!')
      return false
    }
    if ((imageSrcOld.length + files.length) < 3) {
      toast.error('Hãy thêm từ 3 đến 12 ảnh.');
      return false
    }
    if (!listing && (!values.address.city_id || !values.address.district_id || !values.address.ward_id)) {
      toast.error('Vui lòng nhập địa chỉ chi tiết hơn!');
      return false
    }
    if (Object.keys(values).some((key) => !values[key])) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return false
    }
    return true
  }

  const makeAddress = (values: FormikValues) => {
    if (values.address.street)
      return values.address.number + (values.address.number ? ', ' : '') + values.address.street
    else if (!!listing)
      return listing.address
    else
      toast.error('Vui lòng điền đầy đủ thông tin!');

    return ''
  }

  const makeAddressId = (values: FormikValues) => {
    if (values.address.city_id && values.address.district_id && values.address.ward_id)
      return {
        city_id: values.address.city_id,
        district_id: values.address.district_id,
        ward_id: values.address.ward_id
      }
    else if (!!listing)
      return listing.address_id
    else
      toast.error('Vui lòng điền đầy đủ thông tin!');

    return {
      city_id: '',
      district_id: '',
      ward_id: ''
    }
  }

  const onSubmitFailure = async (error: any, imageSrcNew: string[]) => {
    toast.error('Đã có lỗi xảy ra!');
    console.log(error)

    // Delete new images if error
    await Promise.all(imageSrcNew.map((src: string) => {
      deleteImage(imageSrcToPublicId(src))
    }))
    console.log("Don't worry, images are deleted!")
  }

  const onSubmitSuccess = async (postId: string, userId: string) => {
    toast.success('Đăng tin thành công!');

    await supabase
      .from('follows')
      .insert([
        { 'post_id': postId, 'follower_id': userId },
      ])

    router.push(`/listings/${postId}`)
  }

  const formik = useFormik<IPostForm>({
    initialValues: {
      category: listing?.category || "",
      address: {
        city_id: "",
        district_id: "",
        ward_id: "",
        street: "",
        number: "",
      },
      area: listing?.area || 0,
      utility: listing?.utility || [],
      title: listing?.title || "",
      description: listing?.description || "",
      price: listing?.price || 0,
      fees: listing?.fees || { deposit: 0, electricity: 0, water: 0, internet: 0 },
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!!listing) return

    const newZoom = formik.values.address.ward_id ? 15 : formik.values.address.district_id ? 13 : formik.values.address.city_id ? 9 : 5
    setZoom(newZoom)
  }, [formik.values.address.ward_id, formik.values.address.district_id, formik.values.address.city_id])

  return (
    <PostForm
      isLoading={isLoading}
      handleSubmit={formik.handleSubmit}
      values={formik.values}
      setFieldValue={formik.setFieldValue}
      addressLabel={addressLabel}
      setAddressLabel={setAddressLabel}
      selectedPoint={selectedPoint}
      setSelectedPoint={setSelectedPoint}
      zoom={zoom}
      imageSrcOld={imageSrcOld}
      setImageSrcOld={setImageSrcOld}
      files={files}
      setFiles={setFiles}
    />
  )
}
