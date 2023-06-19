import { supabase } from "@/supabase/supabase-app";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { FormikConfig, FormikValues, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CSSTransition } from "react-transition-group";
import * as Yup from 'yup';
import Avatar from "../Avatar";
import Button from "../Button";
import Input from "../input/Input";
import PopupInputContainer from "../input/PopupInputContainer";
import ItemSelect from "../input/ItemSelect";

export default function SetUserInfoPopup({ modalRef, modalActive, activeTab, onBack, onNext, session }: {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>,
  modalActive: boolean,
  activeTab: string,
  onBack: () => void,
  onNext: () => void,
  session: any,
}) {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (values: FormikValues) => {
    if (!isUpdated && session?.user?.user_metadata?.year_of_birth) {
      onNext();
      return;
    }
    setLoading(true);

    const { data, error } = (activeTab === 'edit-profile-1') ?
      await onSubmit1(values) : (activeTab === 'edit-profile-2') ?
        await onSubmit2(values) : { data: null, error: null };

    if (!error) {
      toast.success("Đã lưu cập nhật.");
      // edit-profile-1 complete will auto go to edit-profile-2
      (activeTab != 'edit-profile-1') && onNext();
    } else {
      toast.error("Đã có lỗi xảy ra.")
      console.log(error)
      setMessage(error.message);
    }

    setLoading(false);
    setIsUpdated(false);
  }

  const onSubmit1 = async (values: FormikValues) => {
    const updateInfo = {
      full_name: values.full_name,
      year_of_birth: values.year_of_birth,
      is_male: values.is_male,
    }

    // Public profile
    const res = await supabase
      .from('profiles')
      .update(updateInfo)
      .eq('id', session.user.id)

    if (res.error) return res;

    // Metadata
    return await supabase.auth.updateUser({
      data: {
        email: values.email,
        phone: formatPhoneNumber(values.phone),
        ...updateInfo
      }
    })
  }

  const onSubmit2 = async (values: FormikValues) => {
    const updateInfo = {
      avatar_url: values.avatar_url,
      contact: values.contact,
      description: values.description
    }

    // Public profile
    const res = await supabase
      .from('profiles')
      .update(updateInfo)
      .eq('id', session.user.id)

    if (res.error) return res;

    // Metadata
    return await supabase.auth.updateUser({
      data: updateInfo
    })
  }

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      full_name: "",
      year_of_birth: "",
      is_male: undefined,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        // .matches(/^[0-9]*$/, 'Số điện thoại không chứa ký tự đặc biệt')
        .min(10, "Số điện thoại tối thiểu 10 số")
        .required("Hãy nhập đủ thông tin"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Hãy nhập đủ thông tin"),
      full_name: Yup.string()
        .required("Hãy nhập đủ thông tin"),
      year_of_birth: Yup.string()
        .test("Kiểm tra", "Năm sinh không hợp lệ", (value) => {
          const year = parseInt(value || "");
          return year > 1900 && year < new Date().getFullYear();
        })
        .required("Hãy nhập đủ thông tin"),
      is_male: Yup.boolean()
        .required("Hãy nhập đủ thông tin"),
    }),
    onSubmit: handleSubmit,
  } as FormikConfig<{
    phone: string;
    email: string;
    full_name: string;
    year_of_birth: string;
    is_male?: boolean;
  }>
  );

  const formik2 = useFormik({
    initialValues: {
      avatar_url: "",
      contact: "",
      description: "",
    },
    onSubmit: handleSubmit,
  } as FormikConfig<{
    avatar_url: string;
    contact: string;
    description: string;
  }>
  );

  useEffect(() => {
    if (!session || isUpdated) return

    // First page
    formik.setFieldValue("email", session.user.email || session.user.user_metadata?.email);
    formik.setFieldValue("phone", formatPhoneNumber(session.user.phone || session.user.user_metadata?.phone));
    formik.setFieldValue("full_name", session.user.user_metadata?.full_name);
    formik.setFieldValue("year_of_birth", session.user.user_metadata?.year_of_birth);
    formik.setFieldValue("is_male", session.user.user_metadata?.is_male);

    // Second page
    formik2.setFieldValue("avatar_url", session.user.user_metadata?.avatar_url);
    formik2.setFieldValue("contact", session.user.user_metadata?.contact);
    formik2.setFieldValue("description", session.user.user_metadata?.description);
  }, [session, isUpdated])

  return (
    <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-hidden'>
      <CSSTransition
        in={activeTab === 'edit-profile-1'}
        unmountOnExit
        timeout={500}
        classNames={modalActive ? "menu-login" : ""}
      >
        <PopupInputContainer label="Thông tin cá nhân" onBack={onBack}>
          <form onSubmit={formik.handleSubmit} className="h-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Input
                onChange={(value) => {
                  formik.setFieldValue("email", value)
                  setIsUpdated(true)
                }}
                value={formik.values.email}
                id="email"
                label="Email"
                disabled={isLoading || session?.user?.email}
                onBlur={formik.handleBlur}
                required
              />
              <Input
                onChange={(value) => {
                  formik.setFieldValue("phone", value)
                  setIsUpdated(true)
                }}
                value={formik.values.phone}
                id="phone"
                label="Số điện thoại"
                disabled={isLoading || session?.user?.phone}
                onBlur={formik.handleBlur}
                required
              />
              <Input
                onChange={(value) => {
                  formik.setFieldValue("full_name", value)
                  setIsUpdated(true)
                }}
                value={formik.values.full_name}
                id="full_name"
                label="Họ và tên"
                disabled={isLoading}
                onBlur={formik.handleBlur}
                required
              />
              <Input
                onChange={(value) => {
                  formik.setFieldValue("year_of_birth", value)
                  setIsUpdated(true)
                }}
                value={formik.values.year_of_birth}
                id="year_of_birth"
                label="Năm sinh"
                disabled={isLoading}
                type="number"
                onBlur={formik.handleBlur}
                required
              />
              <ItemSelect
                onChange={(value) => {
                  formik.setFieldValue("is_male", (value.label === 'Nam'))
                  setIsUpdated(true)
                }}
                value={(formik.values.is_male === undefined) ? {} : (formik.values.is_male ? { label: 'Nam' } : { label: 'Nữ' })}
                options={[{ label: 'Nam', value: 'Nam' }, { label: 'Nữ', value: 'Nữ' }]}
                placeholder="Giới tính"
                isClearable={false}
              />

              {(formik.errors.email && formik.touched.email) ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : (formik.errors.phone && formik.touched.phone) ? (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              ) : (formik.errors.full_name && formik.touched.full_name) ? (
                <p className="text-red-500 text-sm">{formik.errors.full_name}</p>
              ) : (formik.errors.year_of_birth && formik.touched.year_of_birth) ? (
                <p className="text-red-500 text-sm">{formik.errors.year_of_birth}</p>
              ) : (formik.errors.is_male && formik.touched.is_male) ? (
                <p className="text-red-500 text-sm">{formik.errors.is_male}</p>
              ) : message ? (
                <p className="text-red-500 text-sm">{message}</p>
              ) : null
              }
            </div>

            <div className="flex justify-end gap-2">
              <div className='w-1/3'>
                <Button
                  label={isUpdated ? 'Tiếp tục' : 'Bỏ qua'}
                  onClick={() => { }}
                  disabled={isLoading}
                  outline={!isUpdated}
                />
              </div>
            </div>
          </form>
        </PopupInputContainer>
      </CSSTransition>

      <CSSTransition
        in={activeTab === 'edit-profile-2'}
        unmountOnExit
        timeout={500}
        classNames={modalActive ? "menu-signup" : ""}
      >
        <PopupInputContainer label="Thông tin cá nhân" onBack={onBack}>
          <div className="flex-1 flex flex-col gap-2 items-center pb-4 relative">
            <Avatar src={session?.user?.user_metadata?.avatar_url} size={60} />
            <span className="text-neutral-600 text-lg">{session?.user?.user_metadata?.full_name}</span>
          </div>

          <form onSubmit={formik2.handleSubmit} className="h-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Input
                onChange={(value) => {
                  formik2.setFieldValue("contact", value)
                  setIsUpdated(true)
                }}
                value={formik2.values.contact}
                id="contact"
                label="Liên hệ"
                disabled={isLoading}
                onBlur={formik2.handleBlur}
                multiline
              />
              <Input
                onChange={(value) => {
                  formik2.setFieldValue("description", value)
                  setIsUpdated(true)
                }}
                value={formik2.values.description}
                id="description"
                label="Giới thiệu bản thân"
                disabled={isLoading}
                onBlur={formik2.handleBlur}
                multiline
              />
            </div>

            <div className="flex justify-end gap-2">
              <div className='w-1/3'>
                <Button
                  label={isUpdated ? 'Cập nhật' : 'Bỏ qua'}
                  onClick={() => { }}
                  disabled={isLoading}
                  outline={!isUpdated}
                />
              </div>
            </div>
          </form>
        </PopupInputContainer>
      </CSSTransition>
    </dialog>
  )
}