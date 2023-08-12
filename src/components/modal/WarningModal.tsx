'use client'

import { Ref } from "react"
import ModalSingle from "./ModalSingle";
import Button from "../buttons/Button";

export default function WarningModal({
  modalRef, onAccept, onClose
}: {
  modalRef: Ref<HTMLDialogElement>, onAccept: () => void, onClose: () => void
}) {
  return (
    <ModalSingle modalRef={modalRef} label="Lưu ý" onBack={onClose} className="flex flex-col gap-6">
      <div className="text-neutral-600">
        Hành động này không thể đảo ngược, tiếp tục?
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
            warning
          />
        </div>
      </div>
    </ModalSingle>
  )
}