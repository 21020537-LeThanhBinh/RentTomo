import { CSSTransition } from "react-transition-group";
import LoginPage from "../auth/login/LoginPage";
import SetPasswordPage from "../auth/setPassword/SetPasswordPage";
import SignupPage from "../auth/signup/SignupPage";
import VerifyPage from "../auth/verify/VerifyPage";
import { useEffect } from "react";

export default function AuthPopup({ modalRef1, modalRef2, modalActive, activeTab }: {
  modalRef1: React.MutableRefObject<HTMLDialogElement | null>,
  modalRef2: React.MutableRefObject<HTMLDialogElement | null>,
  modalActive: boolean,
  activeTab: string,
}) {
  useEffect(() => {
    console.log(modalActive)
  }, [modalActive])

  return (
    <>
      <dialog ref={modalRef1} className='popup sm:w-[540px] w-full rounded-2xl overflow-x-hidden h-[90%]'>
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
          classNames={(modalActive && (activeTab != 'verify')) ? "menu-login" : ""}
        >
          <div className='w-full absolute left-0'>
            <VerifyPage />
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeTab === 'set-password'}
          unmountOnExit
          timeout={500}
          classNames={modalActive ? "menu-signup" : ""}
        >
          <div className='w-full absolute left-0'>
            <SetPasswordPage />
          </div>
        </CSSTransition>
      </dialog>
    </>
  )
}