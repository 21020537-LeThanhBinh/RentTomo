'use client'

import { supabase } from '@/supabase/supabase-app';
import createQueryString from '@/utils/createQueryString';
import handleCloseDialog from '@/utils/handleCloseDialog';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';
import AuthPopup from './AuthPopup';
import MenuItem from './MenuItem';
import SetUserInfoPopup from '../profile/SetUserInfoPopup';

export default function UserMenu() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const modalRef1 = useRef<HTMLDialogElement>(null);
  const modalRef2 = useRef<HTMLDialogElement>(null);
  const modalRef3 = useRef<HTMLDialogElement>(null);

  const [session, setSession] = useState<any>(null);
  const [sessionEvent, setSessionEvent] = useState<any>(null);
  const [modalActive, setModalActive] = useState(0);
  const [activeTab, setActiveTab] = useState(''); // login, signup, verify, set-password, edit-profile-...
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setSessionEvent(event)
      console.log(event, session)
    })

    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, menuRef.current!, () => menuRef.current?.close())
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      handleCloseDialog(e, modalRef1.current!, () => modalRef1.current?.open && router.push(pathname))
      // handleCloseDialog(e, modalRef3.current!, () => modalRef3.current?.open && router.push(pathname))
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pathname]);

  useEffect(() => {
    if (!session || searchParams.has('account')) {
      return;
    }

    if ((sessionEvent == 'SIGNED_IN' || sessionEvent == 'INITIAL_SESSION') && (!session.user?.user_metadata?.year_of_birth)) {
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-1'))
    }

    if ((sessionEvent == 'USER_UPDATED') && (session.user?.user_metadata?.year_of_birth) && (searchParams.get('popup') == 'edit-profile-1')) {
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-2'))
    }

  }, [session, sessionEvent, searchParams]);

  useEffect(() => {
    const popup = searchParams.get('popup')!;

    // Close all popup
    if (!searchParams.has('popup')) {
      modalRef1.current?.close();
      modalRef2.current?.close();
      modalRef3.current?.close();
      setActiveTab("");
      return;
    }

    if (['login', 'signup', 'verify', 'set-password'].includes(popup)) {
      !modalRef1.current?.open && modalRef1.current?.showModal();
    } else {
      modalRef1.current?.close();
    }

    if (['verify', 'set-password'].includes(popup)) {
      !modalRef2.current?.open && modalRef2.current?.showModal();
    } else {
      modalRef2.current?.close();
    }

    if (popup.startsWith('edit-profile-')) {
      !modalRef3.current?.open && modalRef3.current?.showModal();
    } else {
      modalRef3.current?.close();
    }

    setActiveTab(popup);
  }, [searchParams])

  useEffect(() => {
    const newModalActive = modalRef3.current?.open ? 3 : modalRef2.current?.open ? 2 : modalRef1.current?.open ? 1 : 0;

    setTimeout(() => {
      setModalActive(newModalActive)
    }, 200)
  }, [modalRef1.current?.open, modalRef2.current?.open, modalRef3.current?.open])

  const onRent = useCallback(() => {
    if (!session) {
      return router.push(`${pathname}?popup=login`)
    }

    alert('Phòng của bạn: Updating...')
  }, [session, pathname]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push(pathname)
  }, [pathname]);

  return (
    <div className='flex-shrink-0 relative'>
      <div className="flex flex-row items-center gap-3">
        <div onClick={onRent} className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Phòng của bạn
        </div>
        <button onClick={() => !menuRef.current?.open && menuRef.current?.show()} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={session?.user?.user_metadata?.avatar_url} />
          </div>
        </button>
      </div>

      <dialog ref={menuRef} className="rounded-xl shadow-md w-[26vw] lg:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm mr-0 p-0">
        <div className="flex flex-col cursor-pointer" onClick={() => menuRef.current?.close()}>
          {session ? (
            <>
              <MenuItem
                label={session.user?.user_metadata?.full_name}
                onClick={() => router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-2'))}
              />
              <MenuItem
                label="Đăng xuất"
                onClick={handleSignOut}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Đăng ký"
                onClick={() => router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'signup'))}
              />
              <MenuItem
                label="Đăng nhập"
                onClick={() => router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'login'))}
              />
            </>
          )}
        </div>
      </dialog>

      <AuthPopup
        modalRef1={modalRef1}
        modalRef2={modalRef2}
        modalActive={modalActive}
        activeTab={activeTab}
      />

      <SetUserInfoPopup
        modalRef={modalRef3}
        modalActive={modalActive}
        activeTab={activeTab}
        onBack={() => router.back()}
        onNext={() => router.push((activeTab == 'edit-profile-1') ? (pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-2')) : (pathname))}
        session={session}
      />
    </div>
  );
};