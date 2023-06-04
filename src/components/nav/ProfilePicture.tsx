'use client'

import { useEffect, useRef, useState } from 'react'
import LoginPage from '../auth/LoginPage'
import { useRouter, useSearchParams } from 'next/navigation';
import SignupPage from '../auth/SignupPage';
import Link from 'next/link';
import { supabase } from '@/supabase/supabase-app';

export default function ProfilePicture() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const searchParams = useSearchParams()!;
  const [activeTab, setActiveTab] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") setIsLoggedIn(true)
      else setIsLoggedIn(false)
      console.log(event, session)
    })

    const handleClickOutside = (e: MouseEvent) => {
      const dialogDimensions = modalRef.current?.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions!.left ||
        e.clientX > dialogDimensions!.right ||
        e.clientY < dialogDimensions!.top ||
        e.clientY > dialogDimensions!.bottom
      ) {
        modalRef.current?.close()
        router.push('/')
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!searchParams.has('popup')) modalRef.current?.close();
    else if (!modalRef.current?.open) modalRef.current?.showModal();

    setActiveTab(searchParams.get('popup')!);
  }, [searchParams])

  return (
    <div className='flex-shrink-0'>
      {isLoggedIn ? (
        <Link href="/" onClick={() => supabase.auth.signOut()}>Đăng xuất</Link>
      ) : (
        <Link href="/?popup=login">Tài khoản</Link>
      )}

      <dialog className='sm:w-[540px] w-full rounded-2xl' ref={modalRef}>
        {activeTab === 'login' ? (
          <LoginPage />
        ) : activeTab === 'signup' ? (
          <SignupPage />
        ) : (
          <></>
        )}
      </dialog>
    </div>
  );
};