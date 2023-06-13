import { CSSTransition } from "react-transition-group";
import Input from "../input/Input";
import { useEffect, useState } from "react";
import { FormikConfig, FormikValues, useFormik } from "formik";
import * as Yup from 'yup';
import Button from "../Button";
import { supabase } from "@/supabase/supabase-app";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import PopupInputContainer from "../input/PopupInputContainer";
import { toast } from "react-hot-toast";

export default function SetUserInfoPopup({ modalRef, modalActive, activeTab, onBack, onNext, session }: {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>,
  modalActive: number,
  activeTab: string,
  onBack: () => void,
  onNext: () => void,
  session: any,
}) {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);

    const { data, error } = (activeTab === 'set-user-info-1') ?
      await onSubmit1(values) :
      await onSubmit2(values)

    if (!error) {
      toast.success("Đã lưu cập nhật.");
      (activeTab === 'set-user-info-2') && onNext();
    } else {
      toast.error("Đã có lỗi xảy ra.")
      console.log(error)
      setMessage(error.message);
    }

    setLoading(false);
  }

  const onSubmit1 = async (values: FormikValues) => {
    const res = await supabase
      .from('profiles')
      .update({
        full_name: values.full_name,
        year_of_birth: values.year_of_birth,
      })
      .eq('id', session.user.id)

    if (res.error) return res;

    return await supabase.auth.updateUser({
      data: {
        email: values.email,
        phone: formatPhoneNumber(values.phone),
        full_name: values.full_name,
        year_of_birth: values.year_of_birth,
      }
    })
  }

  const onSubmit2 = async (values: FormikValues) => {
    const res = await supabase
      .from('profiles')
      .update({
        avatar_url: values.avatar_url,
        contact: values.contact,
        description: values.description
      })
      .eq('id', session.user.id)

    if (res.error) return res;

    return await supabase.auth.updateUser({
      data: {
        avatar_url: values.avatar_url,
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      full_name: "",
      year_of_birth: "",
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
    }),
    onSubmit: handleSubmit,
  } as FormikConfig<{
    phone: string;
    email: string;
    full_name: string;
    year_of_birth: string;
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
    if (session) {
      formik.setFieldValue("email", session.user.email);
      session.user.phone && formik.setFieldValue("phone", formatPhoneNumber(session.user.phone));
      !formik.values.full_name && formik.setFieldValue("full_name", session.user.user_metadata?.full_name);
      !formik.values.year_of_birth && formik.setFieldValue("year_of_birth", session.user.user_metadata?.year_of_birth);
    }
  }, [session])

  return (
    <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden'>
      <CSSTransition
        in={activeTab === 'set-user-info-1'}
        unmountOnExit
        timeout={500}
        classNames={modalActive ? "menu-login" : ""}
      >
        <PopupInputContainer label="Thông tin cá nhân" onBack={onBack}>
          <form onSubmit={formik.handleSubmit} className="h-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Input
                onChange={(value) => formik.setFieldValue("email", value)}
                value={formik.values.email}
                id="email"
                label="Email"
                disabled={isLoading || session?.user?.email}
                onBlur={formik.handleBlur}
                required
              />
              <Input
                onChange={(value) => formik.setFieldValue("phone", value)}
                value={formik.values.phone}
                id="phone"
                label="Số điện thoại"
                disabled={isLoading || session?.user?.phone}
                onBlur={formik.handleBlur}
                required
              />
              <Input
                onChange={(value) => formik.setFieldValue("full_name", value)}
                value={formik.values.full_name}
                id="full_name"
                label="Họ và tên"
                disabled={isLoading}
                onBlur={formik.handleBlur}
                required
              />
              <Input
                onChange={(value) => formik.setFieldValue("year_of_birth", value)}
                value={formik.values.year_of_birth}
                id="year_of_birth"
                label="Năm sinh"
                disabled={isLoading}
                type="number"
                onBlur={formik.handleBlur}
                required
              />

              {(formik.errors.email && formik.touched.email) ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : (formik.errors.phone && formik.touched.phone) ? (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              ) : (formik.errors.full_name && formik.touched.full_name) ? (
                <p className="text-red-500 text-sm">{formik.errors.full_name}</p>
              ) : (formik.errors.year_of_birth && formik.touched.year_of_birth) ? (
                <p className="text-red-500 text-sm">{formik.errors.year_of_birth}</p>
              ) : message ? (
                <p className="text-red-500 text-sm">{message}</p>
              ) : null
              }
            </div>

            <div className="flex justify-end gap-2">
              <div className='w-1/3'>
                <Button
                  label='Tiếp tục'
                  onClick={() => { }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </form>
        </PopupInputContainer>
      </CSSTransition>

      <CSSTransition
        in={activeTab === 'set-user-info-2'}
        unmountOnExit
        timeout={500}
        classNames={modalActive ? "menu-signup" : ""}
      >
        <PopupInputContainer label="Thông tin cá nhân" onBack={onBack}>
          <form onSubmit={formik2.handleSubmit} className="h-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Input
                onChange={(value) => formik2.setFieldValue("avatar_url", value)}
                value={formik2.values.avatar_url}
                id="avatar_url"
                label="Avatar"
                disabled={isLoading}
                onBlur={formik2.handleBlur}
              />
              <Input
                onChange={(value) => formik2.setFieldValue("contact", value)}
                value={formik2.values.contact}
                id="contact"
                label="Liên hệ"
                disabled={isLoading}
                onBlur={formik2.handleBlur}
                multiline
              />
              <Input
                onChange={(value) => formik2.setFieldValue("description", value)}
                value={formik2.values.description}
                id="description"
                label="Giới thiệu bản thân"
                disabled={isLoading}
                onBlur={formik2.handleBlur}
              />
            </div>

            <div className="flex justify-end gap-2">
              <div className='w-1/3'>
                <Button
                  label='Tiếp tục'
                  onClick={() => { }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </form>
        </PopupInputContainer>
      </CSSTransition>
    </dialog>
  )
}