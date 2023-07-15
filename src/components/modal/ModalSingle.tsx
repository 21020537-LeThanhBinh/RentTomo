'use client'

import { Ref } from "react"

export default function ModalSingle({
  modalRef, label, onBack, children, className = ''
}: {
  modalRef: Ref<HTMLDialogElement>, label: string, onBack: () => void, children: React.ReactNode, className?: string
}) {
  return (
    <dialog ref={modalRef} className='popup sm:w-[540px] w-full rounded-2xl max-h-[90%]'>
      <div className="w-full rounded-2xl p-2 pt-12">
        <div className='flex'>
          <button onClick={onBack} type="button" className="absolute top-6 text-2xl z-10">🡠</button>
          <div className="absolute top-6 left-0 text-xl font-semibold text-center w-full">
            <span>{label}</span>
          </div>
        </div>

        <div className={`pt-8 ${className}`}>
          {children}
        </div>
      </div>
    </dialog>
  )
}