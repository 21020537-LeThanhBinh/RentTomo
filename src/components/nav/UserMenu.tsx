'use client'

import { supabase } from '@/supabase/supabase-app';
import { createQueryString } from '@/utils/queryString';
import handleCloseDialog from '@/utils/handleCloseDialog';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import SetUserInfoPopup from '../profile/EditProfilePopup';
import AuthPopup from './AuthPopup';
import MenuItem from '../MenuItem';

export default function UserMenu() {
  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const modalRef1 = useRef<HTMLDialogElement>(null);
  const modalRef2 = useRef<HTMLDialogElement>(null);
  const modalRef3 = useRef<HTMLDialogElement>(null);

  const [activeTab, setActiveTab] = useState(''); // login, signup, verify, set-password, edit-profile-...
  const [modalActive, setModalActive] = useState(false);

  const [session, setSession] = useState<any>(null);
  const [sessionEvent, setSessionEvent] = useState<any>(null);
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
      // handleCloseDialog(e, menuRef.current!, () => setMenuOpen(false))
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
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
      setModalActive(false);

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
    const newModalActive = modalRef3.current?.open || modalRef2.current?.open || modalRef1.current?.open;

    if (!newModalActive) setModalActive(false);
    else setTimeout(() => {
      setModalActive(true)
    }, 200)
  }, [modalRef1.current?.open, modalRef2.current?.open, modalRef3.current?.open])

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push(pathname)
  }, [pathname]);

  return (
    <div className='flex justify-end flex-shrink-0 relative'>
      <div ref={menuRef} className="flex flex-row items-center gap-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-4 md:py-2 md:pl-4 md:pr-3 border-[1px] border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu className='block lg:hidden' />
          <div className='font-semibold hidden lg:block'>
            {session?.user?.user_metadata?.full_name || 'Tài khoản'}
          </div>
          <div className="hidden md:block">
            <Avatar src={session?.user?.user_metadata?.avatar_url} />
          </div>
        </button>

        <dialog open={menuOpen} className="rounded-xl shadow-md w-[26vw] lg:w-[240px] bg-white overflow-hidden right-0 top-14 text-sm mr-0 p-0">
          <div onClick={() => setMenuOpen(false)} className="flex flex-col w-full cursor-pointer">
            {session ? (
              <>
                <MenuItem
                  label="Đăng tin"
                  onClick={() => router.push('/post')}
                  className='sm:hidden'
                />
                <MenuItem
                  label="Thông tin cá nhân"
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
      </div>

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