'use client'

import { supabase } from '@/supabase/supabase-app';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import FormAction from "../FormAction";
import FormExtra from "../FormExtra";
import Input from "../Input";
import SignInWithGoogle from '../providers/SignInWithGoogle';
import { loginFields } from "../formFields";
import SignInWithFacebook from '../providers/SignInWithFacebook';
import { toast } from 'react-hot-toast';
import createQueryString from '@/utils/createQueryString';

const fields = loginFields;
let fieldsState: any = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [loginFail, setLoginFail] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [message, setMessage] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticateUser();
  }

  //Handle Login API Integration here
  const authenticateUser = async () => {
    setLoading(true);

    const res = (loginState.email_phone.includes('@')) ? (
      await supabase.auth.signInWithPassword({
        email: loginState.email_phone,
        password: loginState.password,
      })
    ) : (
      await supabase.auth.signInWithPassword({
        phone: formatPhoneNumber(loginState.email_phone),
        password: loginState.password,
      })
    )

    setLoading(false)
    if (!res.error) {
      setLoginFail(false)
      toast.success("Đăng nhập thành công")
      router.push(pathname)
    }
    else {
      setLoginFail(true)
      setMessage(res.error.message)
    }
  }

  const handleForgotPassword = async () => {
    if (!loginState.email_phone) {
      setLoginFail(true)
      setMessage("Vui lòng nhập số điện thoại")
      return
    }

    const res = (loginState.email_phone.includes('@')) ? (
      await supabase.auth.signInWithOtp({
        email: loginState.email_phone,
      })
    ) : (
      await supabase.auth.signInWithOtp({
        phone: formatPhoneNumber(loginState.email_phone),
      })
    )
    
    if (!res.error) {
      router.push(`${pathname}?popup=verify&account=${loginState.email_phone}`)
    } else {
      setLoginFail(true)
      setMessage(res.error.message)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {
          fields.map((field, id) =>
            <div className='my-5' key={id}>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            </div>
          )
        }
      </div>

      {loginFail && (
        <p className="text-red-500 text-sm">{message}</p>
      )}
      <FormExtra handleForgotPassword={handleForgotPassword} />

      {loading ? (
        <div>
          <FormAction>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Đang đăng nhập...
          </FormAction >
        </div>
      ) : (
        <div>
          <FormAction handleSubmit={handleSubmit}>
            Đăng nhập
          </FormAction >
        </div>
      )}

      <p className='text-gray-900 text-center mt-5'>hoặc</p>

      <SignInWithGoogle />
      <SignInWithFacebook />

    </form >
  )
}