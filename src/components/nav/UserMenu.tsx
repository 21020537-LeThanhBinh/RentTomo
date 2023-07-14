'use client'

import { supabase } from '@/supabase/supabase-app';
import handleCloseDialog from '@/utils/handleCloseDialog';
import { createQueryString } from '@/utils/queryString';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from '../MenuItem';
import Avatar from '../profile/Avatar';
import AuthPopup from './AuthPopup';
import EditProfilePopup from '../profile/EditProfilePopup';
const NotificationPopup = dynamic(() => import('../notification/NotificationPopup'), { ssr: false })

export default function UserMenu({ isWhite = false }: { isWhite?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const authModalRef1 = useRef<HTMLDialogElement>(null);
  const authModalRef2 = useRef<HTMLDialogElement>(null);
  const profileModalRef = useRef<HTMLDialogElement>(null);
  const notiModalRef = useRef<HTMLDialogElement>(null);

  const [activeTab, setActiveTab] = useState(''); // login, signup, verify, set-password, edit-profile-...
  const [modalActive, setModalActive] = useState(false);

  const [session, setSession] = useState<any>(null);
  const [sessionEvent, setSessionEvent] = useState<any>(null);
  const [hasNoti, setHasNoti] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setSessionEvent(event)
      console.log(event, session)
    })

    const handleClickOutside = (e: MouseEvent) => {
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
      handleCloseDialog(e, authModalRef1.current!, () => authModalRef1.current?.open && router.replace(pathname, { scroll: false }))
      handleCloseDialog(e, notiModalRef.current!, () => notiModalRef.current?.open && router.replace(pathname, { scroll: false }))
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pathname]);

  useEffect(() => {
    // Close popup after logged in
    if (sessionEvent == 'SIGNED_IN' && (searchParams.get('popup') === 'login')) {
      router.replace(pathname + '?' + createQueryString(searchParams, 'popup', ''))
    }

    if (!session || searchParams.has('account')) {
      return;
    }

    if ((sessionEvent == 'SIGNED_IN' || sessionEvent == 'INITIAL_SESSION') && (!session.user?.user_metadata?.new_full_name)) {
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-1'))
    }

    if ((sessionEvent == 'USER_UPDATED') && (session.user?.user_metadata?.new_full_name) && (searchParams.get('popup') == 'edit-profile-1')) {
      router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-2'))
    }

  }, [session, sessionEvent, searchParams]);

  useEffect(() => {
    const popup = searchParams.get('popup') || '';

    // Close all popup
    if (!searchParams.has('popup')) {
      authModalRef1.current?.close();
      authModalRef2.current?.close();
      profileModalRef.current?.close();
      notiModalRef.current?.close();

      setActiveTab("");
      setModalActive(false);

      return;
    }

    if (['login', 'signup', 'verify', 'set-password'].includes(popup)) {
      !authModalRef1.current?.open && authModalRef1.current?.showModal();
    } else {
      authModalRef1.current?.close();
    }

    if (['verify', 'set-password'].includes(popup)) {
      !authModalRef2.current?.open && authModalRef2.current?.showModal();
    } else {
      authModalRef2.current?.close();
    }

    if (popup.startsWith('edit-profile-')) {
      !profileModalRef.current?.open && profileModalRef.current?.showModal();
    } else {
      profileModalRef.current?.close();
    }

    if (popup === 'notification') {
      !notiModalRef.current?.open && notiModalRef.current?.showModal();
    } else {
      notiModalRef.current?.close();
    }

    setActiveTab(popup);
  }, [searchParams])

  useEffect(() => {
    const newModalActive = profileModalRef.current?.open || authModalRef2.current?.open || authModalRef1.current?.open;

    if (!newModalActive) setModalActive(false);
    else setTimeout(() => {
      setModalActive(true)
    }, 200)
  }, [authModalRef1.current?.open, authModalRef2.current?.open, profileModalRef.current?.open])

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push(pathname)
  }, [pathname]);

  const handleHelp = () => {

  }

  return (
    <div className={`flex justify-end flex-shrink-0 relative ${isWhite && 'text-white'}`} >
      <div ref={menuRef} className="flex flex-row items-center gap-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-4 md:py-2 md:pl-4 md:pr-3 border-[1px] border-neutral-200 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu className='block lg:hidden' />
          <div className='font-semibold hidden lg:block whitespace-nowrap truncate'>
            {session?.user?.user_metadata?.new_full_name || 'Tài khoản'}
          </div>
          <div className="hidden md:block flex-shrink-0">
            {hasNoti && <span className="absolute top-0 right-0 p-2 bg-red-600 rounded-full" title="Thông báo mới"></span>}
            <Avatar src={session?.user?.user_metadata?.new_avatar_url || session?.user?.user_metadata?.avatar_url} />
          </div>
        </button>

        <dialog open={menuOpen} className="rounded-xl shadow-md w-[50vw] sm:w-[26vw] lg:w-[240px] bg-white overflow-hidden right-0 top-14 text-sm mr-0 p-0 z-10">
          <div onClick={() => setMenuOpen(false)} className="flex flex-col w-full cursor-pointer">
            {session ? (
              <>
                <MenuItem
                  label="Đăng tin"
                  onClick={() => router.push('/post')}
                  className='sm:hidden'
                />
                <MenuItem
                  label="Tin của bạn"
                  onClick={() => router.push(`/search/my-listings?id=${session.user.id}`)}
                />
                <MenuItem
                  label="Đang theo dõi"
                  onClick={() => router.push(`/search/following-listings?id=${session.user.id}`)}
                />
                <div className='border-t-[1px] my-2' />

                <MenuItem
                  label="Thông tin cá nhân"
                  onClick={() => {
                    router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-2'), { scroll: false })
                    // When the popup is buggy
                    // if (searchParams.get('popup') == 'edit-profile-2' && !profileModalRef.current?.open)
                    //   profileModalRef.current?.showModal();
                  }}
                  light
                />
                <div className='relative'>
                  <MenuItem
                    label="Thông báo"
                    onClick={() => router.replace(pathname + '?' + createQueryString(searchParams, 'popup', 'notification'), { scroll: false })}
                    light
                  />
                  {hasNoti && <span className="absolute top-4 right-4 p-1 bg-red-600 rounded-full" title="Thông báo mới"></span>}
                </div>
                <div className='border-t-[1px] my-2' />

                <MenuItem
                  label="Trợ giúp"
                  onClick={handleHelp}
                  light
                />
                <MenuItem
                  label="Đăng xuất"
                  onClick={handleSignOut}
                  light
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
        modalRef1={authModalRef1}
        modalRef2={authModalRef2}
        modalActive={modalActive}
        activeTab={activeTab}
      />

      <EditProfilePopup
        modalRef={profileModalRef}
        modalActive={modalActive}
        activeTab={activeTab}
        onBack={() => router.back()}
        onNext={() =>
          (activeTab == 'edit-profile-1') ?
            router.push(pathname + '?' + createQueryString(searchParams, 'popup', 'edit-profile-2'), { scroll: false })
            : router.push(pathname, { scroll: false })
        }
        session={session}
      />

      <NotificationPopup
        modalRef={notiModalRef}
        userId={session?.user?.id}
        setHasNoti={setHasNoti}
        last_read={session?.user?.user_metadata?.last_read}
      />
    </div>
  );
};