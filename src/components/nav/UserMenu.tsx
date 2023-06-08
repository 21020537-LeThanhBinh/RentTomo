'use client'

import { supabase } from '@/supabase/supabase-app';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { CSSTransition } from 'react-transition-group';
import Avatar from '../Avatar';
import LoginPage from '../auth/login/LoginPage';
import SetPasswordPage from '../auth/setPassword/SetPasswordPage';
import SignupPage from '../auth/signup/SignupPage';
import VerifyPage from '../auth/verify/VerifyPage';
import MenuItem from './MenuItem';
import handleCloseDialog from '@/utils/handleCloseDialog';

export default function UserMenu() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null)
  const modalRef2 = useRef<HTMLDialogElement>(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalActive, setModalActive] = useState(0)
  const [activeTab, setActiveTab] = useState(''); // login, signup
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) setIsLoggedIn(true)
      else setIsLoggedIn(false)
      console.log(event, session)
    })
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, menuRef.current!, () => menuRef.current?.close())
      handleCloseDialog(e, modalRef.current!, () => modalRef.current?.open && router.replace(pathname))
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pathname]);

  useEffect(() => {
    if (!searchParams.has('popup')) {
      modalRef.current?.close();
      modalRef2.current?.close();
      setActiveTab("");
      return;
    }

    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }

    if (['verify', 'set-password'].includes(searchParams.get('popup')!)) {
      !modalRef2.current?.open && modalRef2.current?.showModal();
    } else {
      modalRef2.current?.close();
    }

    setActiveTab(searchParams.get('popup')!);
  }, [searchParams])

  useEffect(() => {
    if (modalRef2.current?.open) {
      setTimeout(() => {
        setModalActive(2)
      }, 200)
    } else if (modalRef.current?.open) {
      setTimeout(() => {
        setModalActive(1)
      }, 200)
    } else {
      setModalActive(0)
    }
  }, [modalRef.current?.open, modalRef2.current?.open])

  const onRent = useCallback(() => {
    if (!isLoggedIn) {
      return router.push(`${pathname}?popup=login`)
    }

    alert('Phòng của bạn: Updating...')
  }, [isLoggedIn, pathname]);

  return (
    <div className='flex-shrink-0 relative'>
      <div className="flex flex-row items-center gap-3">
        <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Phòng của bạn
        </div>
        <button onClick={() => !menuRef.current?.open && menuRef.current?.show()} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={""} />
          </div>
        </button>
      </div>

      <dialog ref={menuRef} className="rounded-xl shadow-md w-[30vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm mr-0 p-0">
        <div className="flex flex-col cursor-pointer">
          {isLoggedIn ? (
            <>
              <MenuItem
                label="Đăng xuất"
                onClick={() => { supabase.auth.signOut(); router.push('/') }}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Đăng ký"
                onClick={() => router.push(`${pathname}?popup=signup`)}
              />
              <MenuItem
                label="Đăng nhập"
                onClick={() => router.push(`${pathname}?popup=login`)}
              />
            </>
          )}
        </div>
      </dialog>

      <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%]'>
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
      </dialog>

      <dialog ref={modalRef2} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%] z-10 modalRef2'>
        <CSSTransition
          in={activeTab === 'verify'}
          unmountOnExit
          timeout={500}
          classNames={modalActive == 2 ? "menu-login" : ""}
        >
          <div className='w-full absolute left-0'>
            <VerifyPage />
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeTab === 'set-password'}
          unmountOnExit
          timeout={500}
          classNames={modalActive == 2 ? "menu-signup" : ""}
        >
          <div className='w-full absolute left-0'>
            <SetPasswordPage />
          </div>
        </CSSTransition>
      </dialog>
    </div>
  );
};