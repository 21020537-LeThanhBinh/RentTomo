'use client'

import { Ref } from "react"
import ModalSingle from "./ModalSingle";
import Button from "../buttons/Button";

export default function NoticeModal({
  modalRef, onAccept, onClose, label = "Chú ý", children
}: {
  modalRef: Ref<HTMLDialogElement>, onAccept: () => void, onClose: () => void, label?: string, children?: React.ReactNode
}) {
  return (
    <ModalSingle modalRef={modalRef} label={label} onBack={onClose} className="flex flex-col gap-6">
      <div>
        {children}
      </div>

      <div className="flex justify-end gap-2 w-full">
        <div className="w-full sm:w-1/3 lg:w-1/4">
          <Button
            label="Hủy"
            onClick={onClose}
            outline
          />
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/4">
          <Button
            label="Đồng ý"
            onClick={() => { onAccept(); onClose(); }}
          />
        </div>
      </div>
    </ModalSingle>
  )
}