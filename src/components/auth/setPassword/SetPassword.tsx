'use client'

import { supabase } from '@/supabase/supabase-app';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import FormAction from '../FormAction';
import Input from '../Input';
import { signupFields } from '../formFields';

const fields = signupFields;
let fieldsState: any = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function SetPassword() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [message, setMessage] = useState("")

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    const res = await supabase.auth.updateUser({
      password: values.password,
    })

    setLoading(false)
    if (!res.error) {
      console.log(res)
      router.push(`/?popup=set-user-info-1`)
    } else {
      setMessage(res.error.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Hãy nhập đủ thông tin"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Hãy nhập đủ thông tin")
    }),
    onSubmit: handleSubmit,
  } as FormikConfig<{
    password: string;
    confirm_password: string;
  }>
  );

  return (
    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
      <div className="">
        <div className='my-5'>
          <Input
            key={fields[2].id}
            handleChange={formik.handleChange}
            value={formik.values.password}
            labelText={fields[2].labelText}
            labelFor={fields[2].labelFor}
            id={fields[2].id}
            name={fields[2].name}
            type={fields[2].type}
            isRequired={fields[2].isRequired}
            placeholder={fields[2].placeholder}
            onBlur={formik.handleBlur}
          />

          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div className='my-5'>
          <Input
            key={fields[3].id}
            handleChange={formik.handleChange}
            value={formik.values.confirm_password}
            labelText={fields[3].labelText}
            labelFor={fields[3].labelFor}
            id={fields[3].id}
            name={fields[3].name}
            type={fields[3].type}
            isRequired={fields[3].isRequired}
            placeholder={fields[3].placeholder}
            onBlur={formik.handleBlur}
          />

          {formik.errors.confirm_password && formik.touched.confirm_password && (
            <p className="text-red-500 text-sm">{formik.errors.confirm_password}</p>
          )}
        </div>

        {message && (
          <p className="text-red-500 text-sm">{message}</p>
        )}

        {loading ? (
          <FormAction>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Đang xử lý...
          </FormAction>
        ) : (
          <FormAction handleSubmit={formik.handleSubmit} >
            Xác nhận
          </FormAction>
        )}

      </div>
    </form>
  )
}