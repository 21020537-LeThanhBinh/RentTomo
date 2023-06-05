'use client'

import { supabase } from '@/supabase/supabase-app';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../auth/SignupPage';
import VerifyPage from '../auth/VerifyPage';
// import '../../app/globals.css'

export default function ProfilePicture() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [modalActive, setModalActive] = useState(false)
  const searchParams = useSearchParams()!;
  const [activeTab, setActiveTab] = useState(''); // login, signup
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setIsLoggedIn(true)
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

  useEffect(() => {
    if (modalRef.current?.open) {
      setTimeout(() => {
        setModalActive(true)
      }, 200)
    } else {
      setModalActive(false)
    }
  }, [modalRef.current?.open])

  return (
    <div className='flex-shrink-0'>
      {isLoggedIn ? (
        <Link href="/" onClick={() => supabase.auth.signOut()}>Đăng xuất</Link>
      ) : (
        <Link href="/?popup=login" onClick={() => modalRef.current?.showModal()}>Tài khoản</Link>
      )}

      <dialog ref={modalRef} className='sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%]'>
        <CSSTransition
          in={activeTab === 'login'}
          unmountOnExit
          timeout={500}
          classNames={modalActive ? "menu-login" : ""}
        >
          <div className='w-full absolute left-0'>
            <LoginPage />
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeTab === 'signup'}
          unmountOnExit
          timeout={500}
          classNames={modalActive ? "menu-signup" : ""}
        >
          <div className='w-full absolute left-0'>
            <SignupPage />
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeTab === 'verify'}
          unmountOnExit
          timeout={500}
          classNames={modalActive ? "menu-signup" : ""}
        >
          <div className='w-full absolute left-0'>
            <VerifyPage />
          </div>
        </CSSTransition>
      </dialog>
    </div>
  );
};